import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaEditService, MEState } from '../../services/media-edit.service';
import { trigger, state, style, transition, animate } from '../../../../node_modules/@angular/animations';
import { utterType } from '../../services/story.service';
import { SpeechSynthesisService } from '../../services/speech-synthesis.service';
import { takeWhile, first, filter, map, takeUntil, concatAll, withLatestFrom, pairwise } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DeviceService } from '../../services/device.service';

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

  sideWidth = 250;

  changeSideWidth$ = new Subject<PointerEvent>();


  constructor(/*private route: ActivatedRoute, */
    public meService: MediaEditService, private SSService: SpeechSynthesisService,
    private device: DeviceService) {
  }

  ngOnInit() {
    const self = this;
    let currentIFrame = -1;
    self.meService.onStateChanged.pipe(filter(_ => !!self.meService.onCurrentTimeChanged === true), first()).subscribe(_ => {
      self.meService.onCurrentTimeChanged.subscribe(t => {
        if (self.meService.story.utterType === utterType.none) {
          return;
        } else {
          const i = self.meService.story.frames.findIndex(v => ((t >= v.start) && (t <= v.end)));
          if (i === currentIFrame || self.meService.story.iFrame >= 0) {
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

    // * [2018-10-01 15:10] Used to change the sideWidth
    self.changeSideWidth$.pipe(map(_ => self.device.onPointermove$.pipe(takeUntil(self.device.onPointerup$))),
      concatAll(),
      pairwise()).subscribe(arr => {
        self.sideWidth -= arr[1].screenX - arr[0].screenX;
      });
  }

}
