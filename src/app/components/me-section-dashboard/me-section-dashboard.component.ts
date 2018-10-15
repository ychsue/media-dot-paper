import { Component, OnInit } from '@angular/core';
import { MediaEditService } from '../../services/media-edit.service';
import { AFrame } from '../../vm/a-frame';

@Component({
  selector: 'app-me-section-dashboard',
  templateUrl: './me-section-dashboard.component.html',
  styleUrls: ['./me-section-dashboard.component.css']
})
export class MeSectionDashboardComponent implements OnInit {

  constructor(public meService: MediaEditService) { }

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
}
