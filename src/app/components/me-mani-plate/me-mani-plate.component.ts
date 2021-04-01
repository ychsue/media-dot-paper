import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy, Input, NgZone, ChangeDetectorRef } from '@angular/core';
import { MediaEditService, playerAction, MEState } from 'src/app/services/media-edit.service';
import { trigger, transition, style, animate, state } from '../../../../node_modules/@angular/animations';
import { Subject, interval, of, fromEvent } from 'rxjs';
import { DeviceService } from '../../services/device.service';
import { map, concatAll, takeUntil, count, withLatestFrom, distinctUntilChanged, debounceTime, concat, delay, merge } from 'rxjs/operators';
import { SSutterParameters, SpeechSynthesisService } from '../../services/speech-synthesis.service';
import { PageTextsService } from '../../services/page-texts.service';
import { GvService } from 'src/app/services/gv.service';

@Component({
  selector: 'app-me-mani-plate',
  templateUrl: './me-mani-plate.component.html',
  styleUrls: ['./me-mani-plate.component.css', '../../common-use.css'],
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
      transition('show => hide', [animate('0.2s 1.8s ease-out', style({opacity: 0}))]),
    ])
  ]
})
export class MeManiPlateComponent implements OnInit, AfterViewInit, OnDestroy {

  MEState = MEState;

  IOStartShown = 'out';
  IOEndShown = 'out';
  @Input()HideShow = 'show';

  _msDelta = 400;

  isToUtter: boolean;
  utterPara: SSutterParameters;

  isSubtitleClicked: boolean;

  //#region * [2019-01-04 15:46] For honing pronunciation
  public get toPronunExer(): boolean {
    return this.inUpType === enumShowInUp.PronunExer;
  }

  public set toPronunExer(v: boolean) {
    this.inUpType = (v) ? enumShowInUp.PronunExer : enumShowInUp.main;
  }

  EnumShowInUp = enumShowInUp;
  inUpType = enumShowInUp.main;
  //#endregion  For honing pronunciation

  forDenoteDt: {dt: number, isInit: boolean, x: number, y: number, isHide: boolean, isStartBtn: boolean} =
    {dt: 0, isInit: false, x: 0, y: 0, isHide: false, isStartBtn: false};

  // [innerHtml,innerText]
  subtitleChange$ = new Subject<string>();

  @ViewChild('subtitleView', {static:false})
  subViewRef: ElementRef;

  unSubscribed$ = new Subject<boolean>();

  startChanged$ = new Subject<PointerEvent>();
  endChanged$ = new Subject<PointerEvent>();

  pts: IMeManiPlateComp;

  constructor(public meService: MediaEditService, public SSService: SpeechSynthesisService, public ptsService: PageTextsService,
    private device: DeviceService, private uiEleRef: ElementRef, private ngZone: NgZone,
    private gv: GvService, private cdr: ChangeDetectorRef) {
      const self = this;
      ptsService.PTSReady$.pipe(concat(ptsService.ptsLoaded$)).pipe(takeUntil(self.unSubscribed$)).subscribe(_ => {
        self.pts = ptsService.pts.meManiPlateComp;
      });
    }

  ngOnInit() {
    const self = this;
    // * [2018-08-25 18:19] Update utterPara when iFrame is updated
    this.meService.setiFrame$.pipe(takeUntil(self.unSubscribed$)).subscribe(i => {
      self.inUpType = enumShowInUp.main;
      if (i >= 0) {
        self.updateUtterParaOfAFrame(i);
        if (this.meService.story.frames[this.meService.story.iFrame].isUtter === true) {
          self.utterSubtitle(self.utterPara.text, self.utterPara);
        }
      }
    });
    // * [2018-08-25 18:44] For subtitleChange
    self.subtitleChange$.pipe(takeUntil(self.unSubscribed$)).pipe(
      debounceTime(700),
      distinctUntilChanged()).subscribe(st => {
        self.meService.story.frames[self.meService.story.iFrame].subtitle = st;
        self.ngZone.runOutsideAngular(_ => {
          const text = (<HTMLElement>self.subViewRef.nativeElement).innerText;
          self.meService.story.frames[self.meService.story.iFrame].utterPara.text = text;
          self.utterPara.text = text;
        });
      });
    // * [2018-08-26 16:56] Reutter the subtitle for repeatStart
    self.meService.repeatStart$.pipe(takeUntil(self.unSubscribed$)).subscribe(i => {
      if (i >= 0) {
        if (this.meService.story.frames[i].isUtter === true) {
          self.utterSubtitle(self.utterPara.text, self.utterPara);
        }
      }
    });
    // // * [2018-10-01 21:54] Handle pointerUp
    // self.device.onPointerup$.subscribe(ev => self.onPointLeave(ev, self));
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
        const dr = Math.sqrt(Math.pow(vm.screenX - vd.screenX, 2) + Math.pow(vm.screenY - vd.screenY, 2));
        const absDt = 0.1 * Math.ceil(dr / 30);
        if (vm.screenX > vd.screenX) {
          self.forDenoteDt.dt = absDt;
          const start = Math.ceil((frame.start + self.forDenoteDt.dt) * 10) / 10;
          if (start < frame.end) {
            frame.start = start;
            self.meService.seekTime = frame.start;
          }
        } else if ( vm.screenX < vd.screenX) {
          self.forDenoteDt.dt = -absDt;
          const start = Math.floor((frame.start + self.forDenoteDt.dt) * 10) / 10;
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
        const dr = Math.sqrt(Math.pow(vm.screenX - vd.screenX, 2) + Math.pow(vm.screenY - vd.screenY, 2));
        const absDt = 0.1 * Math.ceil(dr / 30);
      if (vm.screenX > vd.screenX) {
          self.forDenoteDt.dt = absDt;
          const end = Math.ceil((frame.end + self.forDenoteDt.dt) * 10) / 10;
          if (end > frame.start && end < self.meService.duration) {
            frame.end = end;
          }
        } else if ( vm.screenX < vd.screenX) {
          self.forDenoteDt.dt = -absDt;
          const end = Math.floor((frame.end + self.forDenoteDt.dt) * 10) / 10;
          if (end > frame.start) {
            frame.end = end;
          }
        }
      })
    ).subscribe();

    // * [2018-11-10 08:28] Clear some effects
    self.device.onPointerup$.pipe(takeUntil(self.unSubscribed$))
    .subscribe(ev => {
      self.setShowDT(ev, false);
    });
  }

  setShowDT(ev: PointerEvent, isInit: boolean = false, isStartBtn: boolean = false) {
    const self = this;
    if (isInit) {
      self.forDenoteDt.isHide = false;
      self.forDenoteDt.isStartBtn = isStartBtn;
      self.forDenoteDt.dt = 0;
      self.forDenoteDt.x = ev.clientX / self.gv.zoomAll;
      self.forDenoteDt.y = ev.clientY / self.gv.zoomAll;
    } else {
      self.forDenoteDt.isHide = true;
    }
  }

  onPlayPause() {
    if (this.meService.state !== MEState.playing) {
      this.meService.onPlayerAction.next(playerAction.play);
    } else if (this.meService.state === MEState.playing) {
      this.meService.onPlayerAction.next(playerAction.pause);
    }
  }

  onOpenInputStart(inStart: HTMLInputElement) {
    this.IOStartShown = 'in';
    this.cdr.detectChanges();
    // setTimeout(() => { // Althogh by setTimeout does work, it's not so beautiful.
      inStart.focus();
    // }, 0);˚s
  }

  onOpenInputEnd(inEnd: HTMLInputElement) {
    this.IOEndShown = 'in';
    this.cdr.detectChanges();
    inEnd.focus();
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
      utterPara.text = text;
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

  async onPointLeave(e: PointerEvent, ele: MeManiPlateComponent = null) {
    const self = (!!ele) ? ele : this;
    const n = await fromEvent(self.uiEleRef.nativeElement, 'pointermove')
    .pipe(
      merge(fromEvent(self.uiEleRef.nativeElement, 'pointerdown')),
      takeUntil(of(true).pipe(delay(1000))),
      count(x => !!x)
    ).toPromise();
    if (n === 0) {
      if ((document.activeElement.localName === "textarea") || (self.inUpType !== enumShowInUp.main) || !!self.isSubtitleClicked) {
        return; // Because this delay will change a lot of thing like ~self.isSSShown~ might change, I dealt it at this place.
      }
      self.HideShow = 'hide';
      // console.log('onPointerLeave: hide' + 'isSSShown:' + self.isSSShown);
    }
  }

  onSubtitleBlur() {
    this.isSubtitleClicked = false;
  }

  onSubtitleClicked(e: MouseEvent) {
    const self = this;
    self.isSubtitleClicked = true;
    this.HideShow = 'show';
    // setTimeout(_ => self.isSubtitleClicked = false, 100);
  }

  onShowSetSS(e: MouseEvent) {
    this.inUpType = enumShowInUp.SS;
    this.HideShow = 'show';
    // console.log('onShowSetSS');
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

  onFixIOSScroll(e: PointerEvent, ele: Element) {
    const self = this;
    if (!!!self.device.isCordova || cordova.platformId !== 'ios') {return; }

    const x0 = ele.scrollLeft;
    const y0 = ele.scrollTop;
    self.device.onPointermove$.pipe(takeUntil(self.device.onPointerup$))
    .subscribe(emv => {
      if (!!ele['scrollTo']) {
        ele.scrollTo({left: e.screenX - emv.screenX + x0,
          top: e.screenY - emv.screenY + y0,
          behavior: 'auto'});
        } else {
          ele.scrollTop = e.screenY - emv.screenY + y0;
          ele.scrollLeft = e.screenX - emv.screenX + x0;
        }
    });
  }
}

enum enumShowInUp {
  main,
  SS, // Speech Synthesizer
  PronunExer
}
