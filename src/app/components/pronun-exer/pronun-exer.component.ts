import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MicRecorderService } from 'src/app/services/mic-recorder.service';
import { MediaEditService } from 'src/app/services/media-edit.service';

@Component({
  selector: 'app-pronun-exer',
  templateUrl: './pronun-exer.component.html',
  styleUrls: ['./pronun-exer.component.css', '../../common-use.css']
})
export class PronunExerComponent implements OnInit {
  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  Math = Math;
  duration = 1; // in second

  constructor(public recorder: MicRecorderService, public meService: MediaEditService) { }

  ngOnInit() {
    const self = this;
    self.meService.setiFrame$.subscribe(i => {
      if (i < 0 && self.recorder.isRecording) {
        self.recorder.stop();
      } else {
        if (self.meService.story.frames.length > i) {
          const frame = self.meService.story.frames[i];
          self.duration = frame.end - frame.start;
        }
      }
    });
  }

}
