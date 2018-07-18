import { Component, OnInit, Input } from '@angular/core';
import { IStory } from '../../services/story.service';
import { Subject, of } from '../../../../node_modules/rxjs';
import { DeviceService } from '../../services/device.service';
import { map, takeUntil, concatAll, concat, withLatestFrom, debounce, debounceTime, merge } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-draglist',
  templateUrl: './draglist.component.html',
  styleUrls: ['./draglist.component.css']
})
export class DraglistComponent implements OnInit {

  @Input() story: IStory;

  deltaX: number;

  private _tmpXPointerdown = {time: 0, x: 0};
  private _tmpXPointermove = {time: 0, x: 0};
  private _tmpVx: number;

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
    self.contentPointerdown$.subscribe(ev => self._tmpXPointerdown = {time: ev.timeStamp, x: ev.screenX});
    // Get the movingX and final V_x
    self.contentPointerdown$.pipe(
      map( _ => self.deviceService.onPointermove$.pipe(
        takeUntil(self.deviceService.onPointerup$),
        // takeUntil(self.deviceService.onPointermove$.pipe(
        //   debounceTime(400),
        //   merge(self.deviceService.onPointerup$)
        // )),
        concat(of({timeStamp: 0, movementX: 0, screenX: -1000}))
      )),
      concatAll(),
      // map(ev => ev.clientX)
      withLatestFrom(self.contentPointerdown$, (e_move, e_down) => {
        if (e_move.timeStamp !== 0) {
          self._tmpXPointermove = {time: e_move.timeStamp, x: e_move.screenX};
        }
        return e_move.screenX - e_down.screenX;
      })
    ).subscribe( dx => {
      if (dx < -1000) {
        self.deltaX = 0;
        self._tmpVx = (self._tmpXPointermove.x - self._tmpXPointerdown.x) / (self._tmpXPointermove.time - self._tmpXPointerdown.time);
        // ****************************************** [2018-07-18 15:51] TODO ****************************************
        console.log(`avg speed: ${self._tmpVx}`);
      } else {
        self.deltaX = (dx < -1000) ? 0 : dx;
      }
    });
  }

  onContentClick(ev) {
    console.log('clicked');
  }

}
