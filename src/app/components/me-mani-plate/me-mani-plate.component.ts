import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MediaEditService, playerAction, MEState } from 'src/app/services/media-edit.service';
import { trigger, transition, style, animate, state } from '../../../../node_modules/@angular/animations';
import { Subject, interval } from '../../../../node_modules/rxjs';
import { DeviceService } from '../../services/device.service';
import { map, concatAll, takeUntil, auditTime, withLatestFrom, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { SSutterParameters, SpeechSynthesisService } from '../../services/speech-synthesis.service';

@Component({
  selector: 'app-me-mani-plate',
  templateUrl: './me-mani-plate.component.html',
  styleUrls: ['./me-mani-plate.component.css'],
  animations: [
    trigger('changeFrame', [
      transition('* => *', [
        style({transform: 'translateY(-100%)'}),
        animate('0.2s 0.1s ease-in', style({transform: 'translateY(0)'}))
      ])
    ]),
    trigger('flyInOut', [
      state('in', style({transform: 'translateY(0)', opacity: 1})),
      state('out', style({transform: 'translateY(100%)', opacity: 0})),
      transition('out => in', [
        style({transform: 'translateY(100%)', opacity: 0}),
        animate('0.2s 0.1s ease-in', style({transform: 'translateY(0)', opacity: 1}))
      ]),
      transition('in => out', [
        animate('0.2s 0.1s ease-out', style({transform: 'translateY(100%)', opacity: 0}))
      ])
    ]),
    trigger('hideShow', [
      state('show', style({opacity: 1})),
      state('hide', style({opacity: 0})),
      transition('hide => show', [animate('0.2s 0.1s ease-in', style({opacity: 1}))]),
      transition('show => hide', [animate('4s 2s ease-out', style({opacity: 0}))]),
    ])
  ]
})
export class MeManiPlateComponent implements OnInit, AfterViewInit, OnDestroy {

  previousState: MEState = MEState.initialized;
  MEState = MEState;

  IOStartShown = 'out';
  IOEndShown = 'out';
  HideShow = 'show';

  _msDelta = 400;

  isToUtter: boolean;
  isSSShown = false;
  utterPara: SSutterParameters;

  isSubtitleClicked: boolean;

  // [innerHtml,innerText]
  subtitleChange$ = new Subject<string[]>();

  unSubscribed$ = new Subject<boolean>();

  startChanged$ = new Subject<PointerEvent>();
  endChanged$ = new Subject<PointerEvent>();

  constructor(public meService: MediaEditService, public SSService: SpeechSynthesisService,
    private device: DeviceService) {
    }

  ngOnInit() {
    const self = this;
    this.previousState = this.meService.state;
    // * [2018-08-25 18:19] Update utterPara when iFrame is updated
    this.meService.setiFrame$.pipe(takeUntil(self.unSubscribed$)).subscribe(i => {
      if (i >= 0) {
        self.updateUtterParaOfAFrame(i);
        if (this.meService.story.frames[this.meService.story.iFrame].isUtter === true) {
          self.utterSubtitle(self.utterPara.text, self.utterPara);
        }
      }
    });
    // * [2018-08-25 18:44] For subtitleChange
    self.subtitleChange$.pipe(takeUntil(self.unSubscribed$)).pipe(
      debounceTime(200),
      distinctUntilChanged()).subscribe(sts => {
        self.meService.story.frames[self.meService.story.iFrame].subtitle = sts[0];
        self.meService.story.frames[self.meService.story.iFrame].utterPara.text = sts[0];
      });
    // * [2018-08-26 16:56] Reutter the subtitle for repeatStart
    self.meService.repeatStart$.pipe(takeUntil(self.unSubscribed$)).subscribe(i => {
      if (i >= 0) {
        if (this.meService.story.frames[i].isUtter === true) {
          self.utterSubtitle(self.utterPara.text, self.utterPara);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.unSubscribed$.next(true);
    this.unSubscribed$.complete();
    this.unSubscribed$ = null;
  }

  ngAfterViewInit() {
    const self = this;
    Promise.resolve(null).then(_ => this.HideShow = 'hide');
    // * [2018-08-09 14:44] For start and value
    self.startChanged$.pipe(takeUntil(self.unSubscribed$)).pipe(map(ev =>
      interval(self._msDelta).pipe(
        withLatestFrom(self.device.onPointermove$),
        map(([ _ , vm]) => vm),
        takeUntil(self.device.onPointerup$)
      )
    ), concatAll())
    .pipe(
      withLatestFrom(self.device.onPointerdown$, (vm, vd) => {
        const frame = self.meService.story.frames[self.meService.story.iFrame];
        if (vm.screenX > vd.screenX) {
          const start = Math.ceil(frame.start + 0.001);
          if (start < frame.end) {
            frame.start = start;
            self.meService.seekTime = frame.start;
          }
        } else if ( vm.screenX < vd.screenX) {
          const start = Math.floor(frame.start - 0.001);
          if (start < frame.end && start >= 0) {
            frame.start = start;
            self.meService.seekTime = frame.start;
          }
        }
      })
    ).subscribe();

    self.endChanged$.pipe(takeUntil(self.unSubscribed$)).pipe(map(ev =>
      interval(self._msDelta).pipe(
        withLatestFrom(self.device.onPointermove$),
        map(([ _ , vm]) => vm),
        takeUntil(self.device.onPointerup$)
      )
    ), concatAll())
    .pipe(
      withLatestFrom(self.device.onPointerdown$, (vm, vd) => {
        const frame = self.meService.story.frames[self.meService.story.iFrame];
        if (vm.screenX > vd.screenX) {
          const end = Math.ceil(frame.end + 0.001);
          if (end > frame.start && end < self.meService.duration) {
            frame.end = end;
          }
        } else if ( vm.screenX < vd.screenX) {
          const end = Math.floor(frame.end - 0.001);
          if (end > frame.start) {
            frame.end = end;
          }
        }
      })
    ).subscribe();
  }

  onPlayPause() {
    if (this.previousState !== MEState.playing) {
      this.meService.onPlayerAction.next(playerAction.play);
      this.previousState = MEState.playing;
    } else if (this.previousState === MEState.playing) {
      this.meService.onPlayerAction.next(playerAction.pause);
      this.previousState = MEState.paused;
    }
  }

  onOpenInputStart(inStart: HTMLInputElement) {
    inStart.focus();
    this.IOStartShown = 'in';
  }

  onOpenInputEnd(inEnd: HTMLInputElement) {
    inEnd.focus();
    this.IOEndShown = 'in';
  }

  tickDisplayWith = (meService: MediaEditService) => {
    return (i: number) => {
      return meService.availablePlaybackRates[i];
    };
  }

  onUtterParaChanged(text: string, utterPara: SSutterParameters) {
    // * [2018-08-25 16:14] Update the frame
    if (this.meService.story.iFrame >= 0) {
      const storyUtterPara = Object.assign({}, utterPara);
      this.meService.story.frames[this.meService.story.iFrame].utterPara = storyUtterPara;
      storyUtterPara.text = text;
      storyUtterPara.voiceName = utterPara.voice.name;
      storyUtterPara.lang = utterPara.voice.lang;
      utterPara.voiceName = utterPara.voice.name;
      utterPara.lang = utterPara.voice.lang;
      delete storyUtterPara['voice'];
    }
    // * [2018-08-25 16:15] Play it.
    if (this.meService.story.frames[this.meService.story.iFrame].isUtter === true) {
      this.utterSubtitle(text, utterPara);
    }
  }

  utterSubtitle(text: string, utterPara: SSutterParameters) {
    this.utterPara = utterPara;
    this.utterPara.text = text;
    this.SSService.speak(this.utterPara);
  }

  onPointLeave(e: PointerEvent) {
    if (this.isSubtitleClicked === false) {
      this.HideShow = 'hide';
    }
  }

  onSubtitleClicked(e: MouseEvent) {
    const self = this;
    self.isSubtitleClicked = true;
    this.HideShow = 'show';
    setTimeout(_ => self.isSubtitleClicked = false, 100);
  }

  onShowSetSS(e: MouseEvent) {
    this.isSSShown = true;
  }

  updateUtterParaOfAFrame(iFrame: number = 0) {
    const self = this;
    const story = self.meService.story;
    let utterPara: SSutterParameters;
    // * [2018-08-25 15:10] Update utterPara from a frame
    if (!!story.frames[iFrame].utterPara === false) {
      utterPara = new SSutterParameters();
      story.frames[iFrame].utterPara = utterPara;
    }
    // * [2018-08-25 18:25] Also update this.utterPara
    utterPara = Object.assign({}, story.frames[iFrame].utterPara);
    self.utterPara = self.SSService.updateUtterParaWithVoice(utterPara);
  }
}
