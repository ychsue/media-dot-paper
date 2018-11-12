import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription, Subject, of, timer } from 'rxjs';
import { DeviceService } from '../../services/device.service';
import { map, takeUntil, concat, concatAll, withLatestFrom, delay, first, merge, pairwise, count, last } from 'rxjs/operators';
import { GvService } from '../../services/gv.service';

@Component({
  selector: 'app-swap-icon',
  templateUrl: './swap-icon.component.html',
  styleUrls: ['./swap-icon.component.css']
})
export class SwapIconComponent implements OnInit, OnDestroy {

  @Input() index: number;

  @Input() bR: number;
  @Input() bG: number;
  @Input() bB: number;
  @Input() bA = 1;

  @Input() isBlink = false;

  @Output() delete = new EventEmitter();
  @Output() contentClick = new EventEmitter();
  @Output() hold = new EventEmitter<number>();

  deltaY: number;
  maxSpeed = 0.5;

  private unsubscribed$ = new Subject<boolean>();
  private _pointerDownTime = 0;
  private _isActivating = false;
  public set isActivating(v: boolean) {
    this.gv.isJustPointerEvents = v;
    this._isActivating = v;
  }
  public get isActivating(): boolean {
    return this._isActivating;
  }

  downPos: {sx: number, sy: number} = {sx: 0, sy: 0};

  // * inner events
  protected contentPointerdown$ = new Subject<PointerEvent>();

  onContentPointerdown(ev: PointerEvent) {
    this.downPos.sx = ev.screenX;
    this.downPos.sy = ev.screenY;
    this.contentPointerdown$.next(ev);
  }

  constructor(private device: DeviceService, private gv: GvService) { }

  ngOnInit() {
    const self = this;
    self.deltaY = 0;
    // * [2018-10-05 11:50] Rewrite the event listener
    let nCount = 0;
    // When Pointer is pressed, get its time and let this App just capture the pointer events.
    this.contentPointerdown$.pipe(takeUntil(self.unsubscribed$))
    .subscribe(ev => {
      self._pointerDownTime = ev.timeStamp;
      self.isActivating = true;
    });
    // When Pointer is up, release the capturing of pointer events and check the pace
    this.device.onPointerup$.pipe(takeUntil(self.unsubscribed$))
    .subscribe(ev => {
      if (self.isActivating === false) { // All of other buttons are listening to this event, too.
        return;
      } else {
        self.isActivating = false;
        nCount = 0;
        if (Math.abs(self.deltaY) / (ev.timeStamp - self._pointerDownTime) > self.maxSpeed) {
          self.delete.next();
        } else {
          self.deltaY = 0;
          // * [2018-10-05 15:06] Since (click) event sometimes does not work, I need to handle it by myself. 100ms is enough for a click
          // console.log('pointerup : ' + (ev.timeStamp - self._pointerDownTime));
          if (ev.timeStamp - self._pointerDownTime < 250) {
            self.onBtnClick(ev);
          }
        }
      }
    });
    // Listen to the move of the pointer
    this.contentPointerdown$.pipe(takeUntil(self.unsubscribed$))
    .pipe(
      map(_ => self.device.onPointermove$.pipe(
        pairwise(),
        takeUntil(self.device.onPointerup$.pipe(merge(self.device.onNoButtonPressed$))))
      ),
      concatAll())
    .subscribe(arr => {
      if (arr[0].buttons === 0 && arr[1].buttons === 0) {
        if (++nCount > 10) {
          nCount = 0;
          self.device.onNoButtonPressed$.next(true);
        }
        return;
      }
      // Move the list
      self.deltaY += arr[1].screenY - arr[0].screenY;
    });

    // * [2018-11-09 14:30] Listen to Hold event
    self.contentPointerdown$.pipe(takeUntil(self.unsubscribed$))
    .pipe(
      map(_ => self.device.onPointermove$.pipe(
        merge(self.device.onPointerup$),
        takeUntil(timer(500).pipe(merge(self.device.onPointerup$.pipe(delay(10))))),
        count(x => ( (x.type === 'pointerup')
          || (Math.abs(self.downPos.sx - x.screenX) > 10)
          || (Math.abs(self.downPos.sy - x.screenY) > 10)) )
        )),
        concatAll()).subscribe(n => {
          if (n === 0) {
            self.hold.next(self.index);
          }
        });
  }

  ngOnDestroy(): void {
    this.unsubscribed$.next(true);
    this.unsubscribed$.complete();
    this.unsubscribed$ = null;
  }

  onBtnClick(ev) {
    const self = this;
    this.contentClick.next(self.index);
  }
}
