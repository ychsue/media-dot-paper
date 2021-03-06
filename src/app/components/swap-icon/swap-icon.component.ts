import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription, Subject, of, timer, fromEvent } from 'rxjs';
import { DeviceService } from '../../services/device.service';
import {
  map, takeUntil, concat, concatAll, withLatestFrom, delay, first, merge,
  pairwise, count, last, take, filter
} from 'rxjs/operators';
import { GvService } from '../../services/GV/gv.service';
import { CrossCompService } from 'src/app/services/cross-comp.service';
import { MediaEditService } from 'src/app/services/media-edit.service';
import { PlayerType } from 'src/app/vm/player-type.enum';

@Component({
  selector: 'app-swap-icon',
  templateUrl: './swap-icon.component.html',
  styleUrls: ['./swap-icon.component.css', '../../common-use.css']
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

  deltaX = 0;
  deltaY = 0;
  maxSpeed = 0.5;

  private unsubscribed$ = new Subject<boolean>();
  private _isActivating = false;
  public set isActivating(v: boolean) {
    this.gv.isJustPointerEvents = v;
    this._isActivating = v;
  }
  public get isActivating(): boolean {
    return this._isActivating;
  }

  private _actionEmitted = new Subject<whichBtnAction>();
  private _duringAction = whichBtnAction.none;
  private _downTime = 0;
  private _downPos: { sx: number, sy: number } = { sx: 0, sy: 0 };
  private _epsPX = 10;
  private _scrollTop = 0;

  // * inner events
  protected contentPointerdown$ = new Subject<PointerEvent>();

  onContentPointerdown(ev: PointerEvent) {
    this.gv.isJustPointerEvents = true;
    this._downPos.sx = ev.screenX;
    this._downPos.sy = ev.screenY;
    this._downTime = ev.timeStamp;
    this._duringAction = whichBtnAction.none;
    this._scrollTop = this.crossComp.listOfMDP.scrollTop;
    this.contentPointerdown$.next(ev);
  }

  constructor(private device: DeviceService, private gv: GvService,
    private meService: MediaEditService, private crossComp: CrossCompService // gotten videoEle from it
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
        // self.crossComp.listOfMDP.scrollTo({left: 0, top: self._scrollTop - self.deltaY, behavior: 'smooth'});
        // * [2018-12-08 16:58] Scroll smoothly
        let canSmoothScroll = false;
        if (!!self.crossComp.listOfMDP.scrollTo) {
          try {
            self.crossComp.listOfMDP.scrollTo({ left: 0, top: self._scrollTop - self.deltaY, behavior: 'auto' });
            canSmoothScroll = true;
          } catch (error) {
            console.log(error);
          }
        }
        if (canSmoothScroll === false) {
          self.crossComp.listOfMDP.scrollTop = self._scrollTop - self.deltaY;
        }

      }
    };
    const holdOrNot = () => {
      if (self._duringAction !== whichBtnAction.none) { return; }
      if ((Math.abs(self.deltaX) < self._epsPX) && (Math.abs(self.deltaY) < self._epsPX)) {
        self._actionEmitted.next(whichBtnAction.hold);
      } else {
        self._actionEmitted.next(whichBtnAction.longerThanHold);
      }
    };
    const clickDeleteOrIgnore = (ev: PointerEvent) => {
      if ((self._duringAction !== whichBtnAction.none) && (self._duringAction !== whichBtnAction.longerThanHold)) { return; }
      const dt = ev.timeStamp - self._downTime;
      if (Math.abs(self.deltaX / dt) > self.maxSpeed) {
        self._actionEmitted.next(whichBtnAction.delete);
      } else if ((self._duringAction === whichBtnAction.none) &&
        (Math.abs(self.deltaX) < self._epsPX) && (Math.abs(self.deltaY) < self._epsPX)) {
        self._actionEmitted.next(whichBtnAction.click);
      } else {
        const dY = self.deltaY / dt * 500;
        if (!!self.crossComp.listOfMDP.scrollTo && Math.abs(dY) > Math.abs(self.deltaY)) {
          try {
            self.crossComp.listOfMDP.scrollTo({ left: 0, top: self._scrollTop - dY, behavior: 'smooth' });
          } catch (error) {
            console.log(error);
          }
        }
      }
    };

    const refresh = () => {
      self.gv.isJustPointerEvents = false;
      self.deltaX = 0;
      self.deltaY = 0;
      this._duringAction = whichBtnAction.none;
    };

    self._actionEmitted.pipe(takeUntil(self.unsubscribed$)).subscribe(which => {
      self._duringAction = which;
      if (self._duringAction === whichBtnAction.click) {
        self.onBtnClick(null); // for iOS
        self.contentClick.next();
      } else if (self._duringAction === whichBtnAction.delete) {
        self.delete.next();
      } else if (self._duringAction === whichBtnAction.hold) {
        self.hold.next();
      }
    });
    this.contentPointerdown$.pipe(takeUntil(self.unsubscribed$))
      .pipe(
        map(_ => self.device.onPointermove$
          .pipe(
            map(mv => {
              if (mv !== null) {
                moveBtn(mv);
              }
              return mv;
            }),
            merge(
              timer(700) // for holding
                .pipe(
                  map(t => {
                    holdOrNot();
                    return <PointerEvent>null;
                  })
                )
            ),
            takeUntil(
              self.device.onPointerup$
                .pipe(
                  map(uv => {
                    clickDeleteOrIgnore(uv);
                    return uv;
                  }),
                  merge(self._actionEmitted
                    .pipe(
                      filter(which => which !== whichBtnAction.longerThanHold)
                    )
                  ),
                  map(ev => {
                    refresh();
                  })
                )
            )
          )
        ),
        concatAll()
      ).subscribe(ev => {
        // console.log(ev);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribed$.next(true);
    this.unsubscribed$.complete();
    this.unsubscribed$ = null;
  }

  onBtnClick(ev) {
    const self = this;
    // this.contentClick.next(self.index);
    self.crossComp.clickVideoLoad_justIOS(() => {
      const i = self.index;
      self.meService.setiFrame(i);
      if (i >= 0) {
        this.meService.seekTime = this.meService.story.frames[i].start;
      }
    });
  }
}

export enum whichBtnAction {
  none,
  click,
  delete,
  hold,
  longerThanHold
}
