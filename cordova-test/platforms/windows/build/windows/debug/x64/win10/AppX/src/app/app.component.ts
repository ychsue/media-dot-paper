import { Component, AfterViewInit } from '@angular/core';
import { MessageService, MessageTypes } from './services/message.service';
import { MatBottomSheet } from '@angular/material';
import { MessageComponent } from './message/message.component';
import { YoutubeService } from './services/youtube.service';
import { GvService, PageType } from './services/gv.service';
import { Subject, of } from 'rxjs';
import { DeviceService } from './services/device.service';
import { concatAll, takeUntil, map, concat, merge, take, debounceTime } from 'rxjs/operators';
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
    let px = NaN;
    // * [2018-07-29 20:11] For resizing the sideNav
    this.resize$.pipe(
        map(_ => self.device.onPointermove$.pipe(
          takeUntil(self.device.onPointerup$.pipe(
            merge(self.device.onPointermove$.pipe(debounceTime(1000)))
          )),
          concat(of(null))
        )),
        concatAll(),
    ).subscribe((ev: PointerEvent) => {
      if (ev === null) { // if at the end
        px = NaN;
        this.decideSidenavMode();
      } else {
        if (isNaN(px)) { // if at the start
          px = ev.screenX;
        } else {
          const dx = ev.screenX - px;
          px = ev.screenX;
            self.sidenavWidth += dx;
        }
      }
    });
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
