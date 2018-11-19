import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { IStory } from '../../vm/story';
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
  @Input() story: IStory |{name: string, viewTime: number};

  @Output() delete = new EventEmitter();
  @Output() contentClick = new EventEmitter();

  deltaX = 0;
  deltaY = 0;
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
    this._pointerDownTime = ev.timeStamp;
    this.isActivating = true;
  }

  constructor(private device: DeviceService, private ccService: CrossCompService,
    public gv: GvService) { }

  ngOnInit() {
    const self = this;
    // When Pointer is up, release the capturing of pointer events and check the pace
    this.device.onPointerup$.pipe(takeUntil(self.unsubscribed$))
    .subscribe(ev => {
      if (self.isActivating === false) { // All of other list items are listening to this event, too.
        return;
      } else {
        self.isActivating = false;
        if (Math.abs(self.deltaX) / (ev.timeStamp - self._pointerDownTime) > self.maxSpeed) {
          self.delete.next();
        } else {
          // * [2018-10-05 15:06] Since (click) event sometimes does not work, I need to handle it by myself. 100ms is enough for a click.
          // console.log('pointerup : ' + (ev.timeStamp - self._pointerDownTime));
          if ((ev.timeStamp - self._pointerDownTime < 1000) &&
            (Math.abs(self.deltaX) < 10) && (Math.abs(self.deltaY) < 10)) {
            self.onContentClick(ev);
          }
          self.deltaX = 0;
          self.deltaY = 0;
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
        // Move the list
        self.deltaX += arr[1].screenX - arr[0].screenX;
        self.deltaY += arr[1].screenY - arr[0].screenY;
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
