import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { IStory } from '../../vm/story';
import { Subject, fromEvent} from 'rxjs';
import { DeviceService } from '../../services/device.service';
import { map, takeUntil, concatAll, merge, pairwise, first } from 'rxjs/operators';
import { CrossCompService } from '../../services/cross-comp.service';
import { GvService } from '../../services/gv.service';

@Component({
  selector: 'app-draglist',
  templateUrl: './draglist.component.html',
  styleUrls: ['./draglist.component.css']
})
export class DraglistComponent implements OnInit, OnDestroy {
  @Input() story: IStory |{name: string, viewTime: number};

  @Output() delete = new EventEmitter();
  @Output() contentClick = new EventEmitter();

  deltaX = 0;
  deltaY = 0;
  maxSpeed = 0.5;

  private _downTime = 0;
  private _downPos: {sx: number, sy: number} = {sx: 0, sy: 0};
  private _epsPX = 10;
  private _isDeleted = false;
  private _downScrollTop = 0;

  private unsubscribed$ = new Subject<boolean>();

  // * inner events
  protected contentPointerdown$ = new Subject<PointerEvent>();

  onContentPointerdown(ev: PointerEvent) {
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
      self.deltaX = ev.screenX - self._downPos.sx;
      self.deltaY = ev.screenY - self._downPos.sy;
      self.ccService.listOfStoredEle.scrollTop = self._downScrollTop - self.deltaY;
      // console.log(this.deltaY);
    };

    const clickDeleteOrIgnore = (ev: PointerEvent) => {
      const dt = ev.timeStamp - self._downTime;
      if (Math.abs(self.deltaX / dt) > self.maxSpeed) {
        self.delete.next();
        self._isDeleted = true; // Since it is deleted, it cannot work anymore
      }  else if ((Math.abs(self.deltaX) < self._epsPX) && (Math.abs(self.deltaY) < self._epsPX)) {
        // self.contentClick.next();
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
                return uv;
              })
            )
          )
        )
      ),
      concatAll()
    ).subscribe(ev => {});

  }

  ngOnDestroy(): void {
    this.unsubscribed$.next(true);
    this.unsubscribed$.complete();
    this.unsubscribed$ = null;
  }

  onClick(ev: MouseEvent) {
    if (this._isDeleted === false) {
      // const self = this;
      // if ((!!window['cordova'] && (cordova.platformId === 'ios'))) {
      //   this.crossComp.videoEle.src = (<IStory>self.story).urlOrID;
      //   this.crossComp.videoEle.load();
      // }
      this.contentClick.next(ev);
    }
  }
}
