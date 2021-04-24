import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { IStory } from '../../vm/story';
import { Subject, fromEvent } from 'rxjs';
import { DeviceService } from '../../services/device.service';
import { map, takeUntil, concatAll, merge, pairwise, first } from 'rxjs/operators';
import { CrossCompService } from '../../services/cross-comp.service';
import { GvService } from '../../services/GV/gv.service';

@Component({
  selector: 'app-draglist',
  templateUrl: './draglist.component.html',
  styleUrls: ['./draglist.component.css']
})
export class DraglistComponent implements OnInit, OnDestroy {
  @Input() story: IStory | { name: string, viewTime: number };

  @Output() delete = new EventEmitter();
  @Output() contentClick = new EventEmitter();

  deltaX = 0;
  deltaY = 0;
  maxSpeed = 0.5;

  private _downTime = 0;
  private _downPos: { sx: number, sy: number } = { sx: 0, sy: 0 };
  private _epsPX = 10;
  private _isDeleted = false;
  private _downScrollTop = 0;

  private unsubscribed$ = new Subject<boolean>();

  // * inner events
  protected contentPointerdown$ = new Subject<PointerEvent>();

  onContentPointerdown(ev: PointerEvent) {
    this.gv.isJustPointerEvents = true;
    this._downPos.sx = ev.screenX;
    this._downPos.sy = ev.screenY;
    this._downTime = ev.timeStamp;
    this._downScrollTop = this.ccService.listOfStoredEle.scrollTop;
    this.contentPointerdown$.next(ev);
  }

  constructor(private device: DeviceService, private ccService: CrossCompService,
    public gv: GvService
  ) { }

  ngOnInit() {
    const self = this;

    const moveBtn = (ev: PointerEvent) => {
      const dx = ev.screenX - self._downPos.sx;
      const dy = ev.screenY - self._downPos.sy;
      if (Math.abs(dx) > Math.abs(dy)) {
        self.deltaX = dx;
      } else {
        self.deltaY = dy;
        // * [2018-12-08 16:58] Scroll smoothly
        let canSmoothScroll = false;
        if (!!self.ccService.listOfStoredEle.scrollTo) {
          try {
            self.ccService.listOfStoredEle.scrollTo({ left: 0, top: self._downScrollTop - self.deltaY, behavior: 'auto' });
            canSmoothScroll = true;
          } catch (error) {
            console.log(error);
          }
        }
        if (canSmoothScroll === false) {
          self.ccService.listOfStoredEle.scrollTop = self._downScrollTop - self.deltaY;
        }
      }
      // console.log(this.deltaY);
    };

    const clickDeleteOrIgnore = (ev: PointerEvent) => {
      const dt = ev.timeStamp - self._downTime;
      if (Math.abs(self.deltaX / dt) > self.maxSpeed) {
        self.delete.next();
        self._isDeleted = true; // Since it is deleted, it cannot work anymore
      } else if ((Math.abs(self.deltaX) < self._epsPX) && (Math.abs(self.deltaY) < self._epsPX)) {
        self.contentClick.next(ev);
      } else {
        const dY = self.deltaY / dt * 500;
        if (!!self.ccService.listOfStoredEle.scrollTo && Math.abs(dY) > Math.abs(self.deltaY)) {
          try {
            self.ccService.listOfStoredEle.scrollTo({ left: 0, top: self._downScrollTop - dY, behavior: 'smooth' });
          } catch (error) {
            console.log(error);
          }
        }
      }
    };

    this.contentPointerdown$.pipe(takeUntil(self.unsubscribed$))
      .pipe(
        map(_ => self.device.onPointermove$
          .pipe(
            map(mv => {
              moveBtn(mv);
              return mv;
            }),
            takeUntil(
              self.device.onPointerup$
                .pipe(
                  map(uv => {
                    clickDeleteOrIgnore(uv);
                    self.deltaX = 0;
                    self.deltaY = 0;
                    self.gv.isJustPointerEvents = false;
                    return uv;
                  })
                )
            )
          )
        ),
        concatAll()
      ).subscribe(ev => { });

  }

  ngOnDestroy(): void {
    this.unsubscribed$.next(true);
    this.unsubscribed$.complete();
    this.unsubscribed$ = null;
  }

}
