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
    this.meService.story.frames.push(frame);
  }

  onRemoveFrame(i: number) {
    const frames = this.meService.story.frames;
    frames.splice(i, 1);
  }

  onWhichFrame(i: number) {
    this.meService.iFrame = i;
    console.log(`${i}/ **************************** TODO **************************/`);
  }
}
