import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MicRecorderService } from 'src/app/services/mic-recorder.service';
import { MediaEditService, MEState, playerAction } from 'src/app/services/media-edit.service';
import { AFrame } from 'src/app/vm/a-frame';
import { Subject } from 'rxjs';
import { takeUntil, merge } from 'rxjs/operators';
import { FsService } from 'src/app/services/fs.service';
import { PageTextsService } from 'src/app/services/page-texts.service';

@Component({
  selector: 'app-pronun-exer',
  templateUrl: './pronun-exer.component.html',
  styleUrls: ['./pronun-exer.component.css', '../../common-use.css']
})
export class PronunExerComponent implements OnInit, OnDestroy {
  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  private _unsubscribed = new Subject<boolean>();

  isMyVoicePlaying: boolean;

  Math = Math;
  MEState = MEState;
  duration = 1; // in second
  frame: AFrame = new AFrame();

  pts: IPronunExerComp;

  constructor(public recorder: MicRecorderService, public meService: MediaEditService,
    private fs: FsService, private ptsService: PageTextsService
    ) {
      const self = this;
      ptsService.PTSReady$.pipe(merge(ptsService.ptsLoaded$)).pipe(takeUntil(self._unsubscribed)).subscribe(_ => {
        if (!!self.ptsService.pts && !!self.ptsService.pts.pronunExerComp) {
          self.pts = self.ptsService.pts.pronunExerComp;
        }
      });
    }

  ngOnInit() {
    const self = this;
    self.meService.setiFrame$.pipe(takeUntil(self._unsubscribed)).subscribe(i => {
      if (i < 0 && self.recorder.isRecording) {
        self.recorder.stop();
      } else {
        if (self.meService.story.frames.length > i) {
          self.frame = self.meService.story.frames[i];
          self.duration = self.frame.end - self.frame.start;
        }
      }
    });
    self.meService.isRepeat = false;
  }

  ngOnDestroy(): void {
    const self = this;
    self._unsubscribed.next(true);
    self._unsubscribed = null;
    self.frame = null;
    if (self.recorder.isRecording) {self.recorder.stop(); }
    self.meService.isRepeat = true;
  }

  onPlayPause() {
    if (this.meService.state !== MEState.playing) {
      this.meService.onPlayerAction.next(playerAction.play);
    } else if (this.meService.state === MEState.playing) {
      this.meService.onPlayerAction.next(playerAction.pause);
    }
  }

  myVoiceLoadMetaData(audioMyVoice: HTMLAudioElement, e: Event) {
    if (audioMyVoice.duration === Infinity) {
      audioMyVoice.currentTime = 1e101;
      audioMyVoice.ontimeupdate = _ => {
        audioMyVoice.ontimeupdate = _2 => {};
        audioMyVoice.currentTime = audioMyVoice.duration;
      };
    }
  }

  onSaveUserVoice(e: MouseEvent) {
    if (!!window['cordova']) {
      e.preventDefault();
    } else {
      return;
    }
    const self = this;
    const bOF = (!!window['cordova'] && cordova.platformId === 'windows') ? self.recorder.win_file : self.recorder.blob;
    const fName = 'Media_Dot_Paper_Your_Voice.' + 'm4a';
    self.fs.saveFile$$(bOF, fName, 'Audio File');
  }
}
