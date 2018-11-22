import { Component, OnInit } from '@angular/core';
import { MediaEditService } from '../../services/media-edit.service';
import { AFrame } from '../../vm/a-frame';
import { MatDialog } from '@angular/material';
import { DialogComponent, DialogType, SetStartEnd } from 'src/app/dialog/dialog.component';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-me-section-dashboard',
  templateUrl: './me-section-dashboard.component.html',
  styleUrls: ['./me-section-dashboard.component.css', '../../common-use.css']
})
export class MeSectionDashboardComponent implements OnInit {

  constructor(public meService: MediaEditService, public diaglog: MatDialog) { }

  ngOnInit() {
  }

  onAddFrame() {
    const frame = new AFrame();
    frame.start = this.meService.currentTime;
    frame.end = frame.start + 10;
    frame.height = 0.6;
    frame.top = Math.random() * 0.4;
    this.meService.story.frames.push(frame);
  }

  onRemoveFrame(i: number) {
    const frames = this.meService.story.frames;
    this.meService.setiFrame(-1);
    frames.splice(i, 1);
  }

  onWhichFrame(i: number) {
    this.meService.setiFrame(i);
    if (i >= 0) {
      this.meService.seekTime = this.meService.story.frames[i].start;
    }
    // console.log(`${i}/ **************************** TODO **************************/`);
  }

  onShownStoryGSetting() {
    const isShown = this.meService.isToShowStoryGSetting;
    this.meService.setiFrame(-1); // this.meService.isToShowStoryGSetting will be modified during this action.
    this.meService.isToShowStoryGSetting = !isShown;
  }

  onHold(i: number) {
    const self = this;
    const cTime = self.meService.currentTime;
    const frame = this.meService.story.frames[i];
    const dialogRef = self.diaglog.open(DialogComponent, {
      disableClose: true,
      data: {dType: DialogType.startOrEnd, number: cTime,
        ith: i,
        aRGB: {a: frame.colorA, r: frame.colorR, g: frame.colorG, b: frame.colorB},
        startEnd: [frame.start, frame.end]
      }
    });
    setTimeout(() => {
      dialogRef.disableClose = false;
    }, 500);
    dialogRef.afterClosed().pipe(first()).subscribe(whichOne => {
      const which: SetStartEnd = whichOne;
      if (!!which) {
        if (which.start) {frame.start = which.cTime; }
        if (which.end) {frame.end = which.cTime; }
      }
    });
  }
}
