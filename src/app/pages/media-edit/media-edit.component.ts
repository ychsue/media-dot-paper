import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaEditService, MEState, playerAction } from '../../services/media-edit.service';
import { trigger, state, style, transition, animate } from '../../../../node_modules/@angular/animations';
import { SpeechSynthesisService, SSutterParameters } from '../../services/speech-synthesis.service';
import { takeWhile, first, filter, map, takeUntil, concatAll, withLatestFrom, pairwise, merge } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DeviceService } from '../../services/device.service';
import { GvService } from '../../services/gv.service';
import { utterType, mediaVPType, mediaPlayType } from 'src/app/vm/story-g-setting';

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
    private device: DeviceService, private gv: GvService) {
  }

  ngOnInit() {
    const self = this;
    let preIFrame = -1;
    self.meService.onStateChanged.pipe(filter(_ => !!self.meService.onCurrentTimeChanged === true), first()).subscribe(_ => {
      self.meService.onCurrentTimeChanged.subscribe(t => {
        if (!!self.meService.story.gSetting === false) {return; }
        const uType = self.meService.story.utterType;
        const vpType = self.meService.story.gSetting.mVPType;
        const playType = self.meService.story.gSetting.mPlayType;
        if (uType === utterType.none && vpType === mediaVPType.main && playType === mediaPlayType.timeline) {
          return;
        } else {
          const i = self.meService.story.frames.findIndex(v => ((t >= v.start) && (t <= v.end)));
          if ((i === -1) && (playType === mediaPlayType.mdp) && (self.meService.story.frames.length > 0)) {
            // * [2018-10-18 10:29] For mPlayType, since it just change the time, it should be check at first
            if (preIFrame >= (self.meService.story.frames.length - 1)) {
              self.meService.onPlayerAction.next(playerAction.pause);
              preIFrame = -1;
              return;
            } else {
              self.meService.seekTime = self.meService.story.frames[preIFrame + 1].start;
            }
          } else if (i === preIFrame || self.meService.story.iFrame >= 0) {
            // Since it has preformed an action or just inside a frame
            // so that its action is handled by that frame, nothing I need to do here.
            return;
          } else {
            // * [2018-10-18 11:40] Setup volume and rate
            const isVPMain = (vpType === mediaVPType.main);
            self.meService.setVolumeFromFrame((isVPMain) ? -1 : i);
            self.meService.setPlaybackRateFromFrame((isVPMain) ? -1 : i);
            let utterPara: SSutterParameters = null;
            // * [2018-10-18 11:40] Setup uttering
            if (i < 0) {return; }
            if ((self.meService.story.utterType === utterType.all) || (self.meService.story.frames[i].isUtter === true)) {
              utterPara = Object.assign({}, self.meService.story.frames[i].utterPara);
              utterPara = self.SSService.updateUtterParaWithVoice(utterPara);
              self.SSService.speak(utterPara);
            }
            preIFrame = i;
          }
        }
      });
    });

    // * [2018-10-04 23:58] When pointer up, set 'isResizing' as false to hide the cover
    self.device.onPointerup$.subscribe(_ => {self.gv.isJustPointerEvents = false; });
    self.changeSideWidth$.subscribe(_ => {self.gv.isJustPointerEvents = true; });

    let count = 0;
    // * [2018-10-01 15:10] Used to change the sideWidth
    self.changeSideWidth$.pipe(map(_ => self.device.onPointermove$.pipe(
      pairwise(),
      takeUntil(self.device.onPointerup$.pipe(merge(self.device.onNoButtonPressed$))))),
      concatAll()).subscribe(arr => {
        if (arr[0].buttons === 0 && arr[1].buttons === 0) {
          if (++count > 10) {
            self.device.onNoButtonPressed$.next(true);
            count = 0;
          }
        }
        self.sideWidth -= arr[1].screenX - arr[0].screenX;
      });
  }

}
