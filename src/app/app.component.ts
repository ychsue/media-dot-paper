import { Component, AfterViewInit } from '@angular/core';
import { MessageService, MessageTypes } from './services/message.service';
import { MatBottomSheet } from '@angular/material';
import { MessageComponent } from './message/message.component';
import { YoutubeService } from './services/youtube.service';
import { GvService, PageType } from './services/gv.service';
import { Subject, of } from 'rxjs';
import { DeviceService } from './services/device.service';
import { concatAll, takeUntil, map, concat, merge, take, debounceTime, pairwise } from 'rxjs/operators';
import { MediaEditService } from './services/media-edit.service';
import { PageTextsService } from './services/page-texts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  resize$ = new Subject<PointerEvent>();
  sidenavWidth: number;
  sidenavMode: string;

  pageType = PageType;

  pts: IAppComp;

  constructor(public msgService: MessageService, public gv: GvService,
    public ptsService: PageTextsService,
    private ytService: YoutubeService, private device: DeviceService, public meService: MediaEditService) {
      const self = this;
      self.ptsService.PTSReady$.pipe(concat(self.ptsService.ptsLoaded$)).subscribe(isDone => {
        if (isDone) {
          self.pts = self.ptsService.pts.appComp;
        }
      });

      this.sidenavWidth = (window.innerWidth < 800) ? 300 : window.innerWidth / 4;
    this.decideSidenavMode();
  }

  ngAfterViewInit() {
    const self = this;
    this.ytService.embedApiScript();
    let count = 0;
    // * [2018-07-29 20:11] For resizing the sideNav
    this.resize$.pipe(
        map(_ => self.device.onPointermove$.pipe(
          takeUntil(self.device.onPointerup$.pipe(
            // merge(self.device.onPointermove$.pipe(debounceTime(1000)))
            merge(self.device.onNoButtonPressed$)
          ))
        )),
        concatAll(),
        pairwise()
    ).subscribe(arr => {
      if (arr[0].buttons === 0 && arr[1].buttons === 0) {
        if (++count > 10) {
          self.device.onNoButtonPressed$.next(true);
          count = 0;
        }
      }
      self.sidenavWidth += arr[1].screenX - arr[0].screenX;
    });

    self.device.onPointerup$.subscribe(_ => {
      self.gv.isJustPointerEvents = false;
      self.decideSidenavMode();
    });
    self.resize$.subscribe(_ => {self.gv.isJustPointerEvents = true; });
  }

  decideSidenavMode() {
    const self = this;
    if (self.sidenavWidth * 2 > window.innerWidth) {
      self.sidenavMode = 'over';
    } else {
      self.sidenavMode = 'side';
    }
  }

  onvSepPointerDown(ev: PointerEvent) {
    this.resize$.next(ev);
  }
}
