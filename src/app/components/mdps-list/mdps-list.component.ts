import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaEditService } from '../../services/media-edit.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-mdps-list',
  templateUrl: './mdps-list.component.html',
  styleUrls: ['./mdps-list.component.css']
})
export class MdpsListComponent implements OnInit, OnDestroy {

  constructor(public meService: MediaEditService) { }

  unsubscribed$ = new Subject<boolean>();
  currentIFrame = -1;

  ngOnInit() {
    const self = this;
    self.meService.onCurrentTimeChanged.pipe(takeUntil(self.unsubscribed$)).subscribe(t => {
      // * [2018-09-29 14:43] Check whether the current time is inside a frame
      const i = self.meService.story.frames.findIndex( frame => ((t <= frame.end) && (t >= frame.start)));
      const iFrame = self.meService.story.iFrame;
      if (iFrame >= 0 && this.currentIFrame !== iFrame) {
        this.currentIFrame = iFrame;
      } else if (i !== this.currentIFrame) {
        this.currentIFrame = i;
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribed$.next(true);
    this.unsubscribed$.complete();
    this.unsubscribed$ = null;
  }

  onChangeFrame(i: number) {
    this.meService.setiFrame(i);
    if (i >= 0) {
      this.meService.seekTime = this.meService.story.frames[i].start;
    }
  }
}
