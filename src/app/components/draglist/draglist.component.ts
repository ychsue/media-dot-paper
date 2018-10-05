import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { IStory } from '../../services/story.service';
import { Subject} from 'rxjs';
import { DeviceService } from '../../services/device.service';
import { map, takeUntil, concatAll, merge, pairwise } from 'rxjs/operators';
import { CrossCompService } from '../../services/cross-comp.service';
import { GvService } from '../../services/gv.service';

@Component({
  selector: 'app-draglist',
  templateUrl: './draglist.component.html',
  styleUrls: ['./draglist.component.css']
})
export class DraglistComponent implements OnInit, OnDestroy {
  @Input() story: IStory |{name: string};

  @Output() delete = new EventEmitter();
  @Output() contentClick = new EventEmitter();

  deltaX: number;
  maxSpeed = 0.5;

  private _pointerDownTime = 0.1;
  private unsubscribed$ = new Subject<boolean>();
  private _isActivating = false;
  public set isActivating(v: boolean) {
    this.gv.isJustPointerEvents = v;
    this._isActivating = v;
  }
  public get isActivating(): boolean {
    return this._isActivating;
  }

  // * inner events
  protected contentPointerdown$ = new Subject<PointerEvent>();

  onContentPointerdown(ev: PointerEvent) {
    this.contentPointerdown$.next(ev);
  }

  constructor(private device: DeviceService, private ccService: CrossCompService,
    private gv: GvService) { }

  ngOnInit() {
    const self = this;
    self.deltaX = 0;
    // * [2018-10-05 11:50] Rewrite the event listener
    let count = 0;
    // When Pointer is pressed, get its time and let this App just capture the pointer events.
    this.contentPointerdown$.pipe(takeUntil(self.unsubscribed$))
    .subscribe(ev => {
      self._pointerDownTime = ev.timeStamp;
      // self.gv.isJustPointerEvents = true;
      self.isActivating = true;
    });
    // When Pointer is up, release the capturing of pointer events and check the pace
    this.device.onPointerup$.pipe(takeUntil(self.unsubscribed$))
    .subscribe(ev => {
      if (self.isActivating === false) { // All of other list items are listening to this event, too.
        return;
      } else {
        self.isActivating = false;
        // self.gv.isJustPointerEvents = false;
        count = 0;
        if (Math.abs(self.deltaX) / (ev.timeStamp - self._pointerDownTime) > self.maxSpeed) {
          self.delete.next();
        } else {
          self.deltaX = 0;
        }
        // * [2018-10-05 15:06] Since (click) event sometimes does not work, I need to handle it by myself. 100ms is enough for a click.
        // console.log('pointerup : ' + (ev.timeStamp - self._pointerDownTime));
        if (ev.timeStamp - self._pointerDownTime < 250) {
          self.onContentClick(ev);
        }
      }
    });
    // Listen to the move of the pointer
    this.contentPointerdown$.pipe(takeUntil(self.unsubscribed$))
    .pipe(
      map(_ => self.device.onPointermove$
        .pipe(
          pairwise(),
          takeUntil(self.device.onPointerup$.pipe(merge(self.device.onNoButtonPressed$))))),
      concatAll())
      .subscribe(arr => {
        if (arr[0].buttons === 0 && arr[1].buttons === 0) {
          if (++count > 10) {
            count = 0;
            self.device.onNoButtonPressed$.next(true);
          }
          return;
        }
        // Move the list
        self.deltaX += arr[1].screenX - arr[0].screenX;
        self.ccService.listOfStoredEle.scrollTop -= arr[1].screenY - arr[0].screenY;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribed$.next(true);
    this.unsubscribed$.complete();
    this.unsubscribed$ = null;
  }

  onContentClick(ev) {
    this.contentClick.next();
  }

}
