import { Component, OnInit } from '@angular/core';
import { mediaVPType, mediaPlayType, utterType } from 'src/app/vm/story-g-setting';
import { MediaEditService } from 'src/app/services/media-edit.service';

@Component({
  selector: 'app-story-gsetting-plate',
  templateUrl: './story-gsetting-plate.component.html',
  styleUrls: ['./story-gsetting-plate.component.css']
})
export class StoryGsettingPlateComponent implements OnInit {

  mVPType = mediaVPType;
  mPlayType = mediaPlayType;
  utterType = utterType;

  constructor(public meServie: MediaEditService) { }

  ngOnInit() {
  }

  onRearrangeMDP () {
    const self = this;
    if (!!self.meServie.story &&
      !!self.meServie.story.frames &&
      (self.meServie.story.frames.length > 0)) {
        self.meServie.story.frames = self.meServie.story.frames.sort((a, b) => a.start - b.start);
      }
  }
}
