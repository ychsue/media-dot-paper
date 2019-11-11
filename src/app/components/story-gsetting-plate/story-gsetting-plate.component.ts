import { Component, OnInit, OnDestroy } from '@angular/core';
import { mediaVPType, mediaPlayType, utterType } from 'src/app/vm/story-g-setting';
import { MediaEditService } from 'src/app/services/media-edit.service';
import { SSutterParameters, SpeechSynthesisService } from 'src/app/services/speech-synthesis.service';
import { PageTextsService } from 'src/app/services/page-texts.service';
import { Subject } from 'rxjs';
import { merge, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-story-gsetting-plate',
  templateUrl: './story-gsetting-plate.component.html',
  styleUrls: ['./story-gsetting-plate.component.css']
})
export class StoryGsettingPlateComponent implements OnInit, OnDestroy {

  mVPType = mediaVPType;
  mPlayType = mediaPlayType;
  utterType = utterType;

  private _unsubscribed$ = new Subject<boolean>();

  pts: ISGsetComp;

  constructor(public meService: MediaEditService,
    private SSService: SpeechSynthesisService,
    private ptsService: PageTextsService) {
      const self = this;
      ptsService.PTSReady$.pipe(takeUntil(self._unsubscribed$))
        .pipe(merge(ptsService.ptsLoaded$)).subscribe(_ => {
          if (!!ptsService.pts) {
            self.pts = ptsService.pts.sGsetComp;
          }
        });
    }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this._unsubscribed$.next(true);
    this._unsubscribed$.complete();
    this._unsubscribed$ = null;
  }

  onRearrangeMDP () {
    const self = this;
    if (!!self.meService.story &&
      !!self.meService.story.frames &&
      (self.meService.story.frames.length > 0)) {
        self.meService.story.frames = self.meService.story.frames.sort((a, b) => a.start - b.start);
      }
  }

  onChangeGUtterPara(utterPara: SSutterParameters) {
    const self = this;
    if (!!self.meService.story.gSetting === false) {return; }
    if (!!utterPara.voice === false) {
      utterPara = self.SSService.updateUtterParaWithVoice(utterPara);
    }
    utterPara.voiceName = utterPara.voice.name;
    utterPara.lang = utterPara.voice.lang;
    self.meService.story.gSetting.utterPara = utterPara;
  }
}
