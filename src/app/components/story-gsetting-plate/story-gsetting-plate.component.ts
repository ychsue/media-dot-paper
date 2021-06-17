import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { mediaVPType, mediaPlayType, utterType } from 'src/app/vm/story-g-setting';
import { MediaEditService } from 'src/app/services/media-edit.service';
import { SSutterParameters, SpeechSynthesisService } from 'src/app/services/speech-synthesis.service';
import { PageTextsService } from 'src/app/services/page-texts.service';
import { Subject } from 'rxjs';
import { merge, take, takeUntil } from 'rxjs/operators';
import { PlayerType } from "src/app/vm/player-type.enum";
import { MatDialog } from '@angular/material/dialog';
import { SelYoutubeCaptionDialogComponent } from '../sel-youtube-caption-dialog/sel-youtube-caption-dialog.component';
import { IMyCaption, IMyCaptionTrack } from 'src/app/services/YouTube/typeDefs';
import { YoutubeService } from 'src/app/services/youtube.service';
import { AFrame } from 'src/app/vm/a-frame';

@Component({
  selector: "app-story-gsetting-plate",
  templateUrl: "./story-gsetting-plate.component.html",
  styleUrls: ["./story-gsetting-plate.component.css", "../../common-use.css"],
})
export class StoryGsettingPlateComponent implements OnInit, OnDestroy {
  mVPType = mediaVPType;
  mPlayType = mediaPlayType;
  utterType = utterType;
  PlayerType = PlayerType;

  private _unsubscribed$ = new Subject<boolean>();

  pts: ISGsetComp;

  constructor(
    public meService: MediaEditService,
    private SSService: SpeechSynthesisService,
    private ptsService: PageTextsService,
    public dialog: MatDialog,
    public ytService: YoutubeService,
    public ngZone: NgZone
  ) {
    const self = this;
    ptsService.PTSReady$.pipe(takeUntil(self._unsubscribed$))
      .pipe(merge(ptsService.ptsLoaded$))
      .subscribe((_) => {
        if (!!ptsService.pts) {
          self.pts = ptsService.pts.sGsetComp;
        }
      });
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this._unsubscribed$.next(true);
    this._unsubscribed$.complete();
    this._unsubscribed$ = null;
  }

  onRearrangeMDP() {
    const self = this;
    if (
      !!self.meService.story &&
      !!self.meService.story.frames &&
      self.meService.story.frames.length > 0
    ) {
      self.meService.story.frames = self.meService.story.frames.sort(
        (a, b) => a.start - b.start
      );
    }
  }

  onChangeGUtterPara(utterPara: SSutterParameters) {
    const self = this;
    if (!!self.meService.story.gSetting === false) {
      return;
    }
    if (!!utterPara.voice === false) {
      utterPara = self.SSService.updateUtterParaWithVoice(utterPara);
    }
    utterPara.voiceName = utterPara.voice.name;
    utterPara.lang = utterPara.voice.lang;
    self.meService.story.gSetting.utterPara = utterPara;
  }

async  onCaptureYouTubeCaption$$() {
    const self = this;

    const vid = YoutubeService.getYTId(self.meService.story.urlOrID);

    // setTimeout(async() => {
         // 1. Get captionTracks from get_video_info
         // const cTracks: IMyCaptionTrack[] = /* For testing */ [
         //   { langCode: "zh", simpleText: "台灣", baseUrl: "https://abc" },
         //   { langCode: "en", simpleText: "英文", baseUrl: "https://def" },
         // ]; /* For testing */
    const cTracks = await self.ytService.getCTracks$$(vid);
    if (!!cTracks ===false || cTracks.length === 0) {
      return; // I18N TODO in getCTracks$$.
    }
    // 2. Open the dialog to choose a language
    const dialogRef = self.dialog.open(SelYoutubeCaptionDialogComponent, {
      data: cTracks,
    });
    const selTrack: IMyCaptionTrack = await dialogRef
      .afterClosed()
      .pipe(take(1))
      .toPromise();
    // 3. Once select, get the caption
    const captionList = await self.ytService.getCaptionFromUrl$$(
      selTrack.baseUrl
    );
    if (!!!(captionList?.length > 0)) {
      alert("Sorry, I cannot get this video's caption"); //I18N TODO
      return;
    }
    // 4. Update the story
    for (let i0 = 0; i0 < captionList.length; i0++) {
      const caption = captionList[i0];
      const aFrame = new AFrame();
      aFrame.start = caption.start;
      aFrame.end = caption.end;
      aFrame.subtitle = caption.subtitle;
      aFrame.height = 0.2;
      aFrame.top = (i0 % 8) * 0.1;
      self.meService.story.frames.push(aFrame);
    }
        // }, 10);
  }
}
