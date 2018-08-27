import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaEditService, MEState } from '../../services/media-edit.service';
import { trigger, state, style, transition, animate } from '../../../../node_modules/@angular/animations';
import { utterType } from '../../services/story.service';
import { SpeechSynthesisService } from '../../services/speech-synthesis.service';
import { takeWhile, first } from 'rxjs/operators';

@Component({
  selector: 'app-media-edit',
  templateUrl: './media-edit.component.html',
  styleUrls: ['./media-edit.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateY(0)'})),
      transition('void => *', [
        style({transform: 'translateY(-100%)'}),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s 0.1s ease-out', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class MediaEditComponent implements OnInit {

  constructor(/*private route: ActivatedRoute, */
    public meService: MediaEditService, private SSService: SpeechSynthesisService) {
  }

  ngOnInit() {
    const self = this;
    let currentIFrame = -1;
    self.meService.onStateChanged.pipe(takeWhile(_ => !!self.meService.onCurrentTimeChanged === true), first()).subscribe(_ => {
      self.meService.onCurrentTimeChanged.subscribe(t => {
        if (self.meService.story.utterType === utterType.none) {
          return;
        } else {
          const i = self.meService.story.frames.findIndex(v => ((t >= v.start) && (t <= v.end)));
          if (i === currentIFrame) {
            return;
          } else {
            currentIFrame = i;
            if (i < 0) {return; }
            if ((self.meService.story.utterType === utterType.all) || (self.meService.story.frames[i].isUtter === true)) {
              let utterPara = Object.assign({}, self.meService.story.frames[i].utterPara);
              utterPara = self.SSService.updateUtterParaWithVoice(utterPara);
              self.SSService.speak(utterPara);
            }
          }
        }
      });
    });
  }

}
