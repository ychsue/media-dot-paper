import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription, Subject, of } from 'rxjs';
import { DeviceService } from '../../services/device.service';
import { map, takeUntil, concat, concatAll, withLatestFrom } from 'rxjs/operators';

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

  @Output() delete = new EventEmitter();
  @Output() contentClick = new EventEmitter();

  deltaY: number;
  maxSpeed = 0.9;

  private _tmpYPointerdown = {time: 0, y: 0};
  private _tmpYPointermove = {time: 0, y: 0};
  private _tmpVy: number;

  private _subDown: Subscription;
  private _subSwap: Subscription;

  // * inner events
  protected contentPointerdown$ = new Subject<PointerEvent>();
  protected contentPointerup$ = new Subject<PointerEvent>();

  onContentPointerdown(ev: PointerEvent) {
    this.contentPointerdown$.next(ev);
  }

  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
    const self = this;
    // Get the startX
    self._subDown = self.contentPointerdown$.subscribe(ev => self._tmpYPointerdown = {time: ev.timeStamp, y: ev.screenY});
    // Get the movingX and final V_x
    self._subSwap = self.contentPointerdown$.pipe(
      map( _ => self.deviceService.onPointermove$.pipe(
        takeUntil(self.deviceService.onPointerup$),
        concat(of({timeStamp: 0, movementY: 0, screenY: -1000}))
      )),
      concatAll(),
      // map(ev => ev.clientX)
      withLatestFrom(self.contentPointerdown$, (e_move, e_down) => {
        if (e_move.timeStamp !== 0) {
          self._tmpYPointermove = {time: e_move.timeStamp, y: e_move.screenY};
        }
        return e_move.screenY - e_down.screenY;
      })
    ).subscribe( dy => {
      if (dy < -1000) {
        self.deltaY = 0;
        self._tmpVy = (self._tmpYPointermove.y - self._tmpYPointerdown.y) / (self._tmpYPointermove.time - self._tmpYPointerdown.time);
        // * [2018-07-19 10:38] send out a notification 'delete' when the speedX is higher than 0.5
        if (Math.abs(self._tmpVy) > self.maxSpeed) {
          self.delete.next();
        }
      } else {
        self.deltaY = (dy < -1000) ? 0 : dy;
      }
    });
  }

  ngOnDestroy(): void {
    this._subDown.unsubscribe();
    this._subSwap.unsubscribe();
  }

  onBtnClick(ev) {
    const self = this;
    this.contentClick.next(self.index);
  }
}
