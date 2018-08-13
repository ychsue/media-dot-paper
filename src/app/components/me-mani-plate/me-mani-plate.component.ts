import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MediaEditService, playerAction, MEState } from 'src/app/services/media-edit.service';
import { trigger, transition, style, animate, state } from '../../../../node_modules/@angular/animations';
import { Subject, interval } from '../../../../node_modules/rxjs';
import { DeviceService } from '../../services/device.service';
import { map, concatAll, takeUntil, auditTime, withLatestFrom } from 'rxjs/operators';

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
export class MeManiPlateComponent implements OnInit, AfterViewInit {

  previousState: MEState = MEState.initialized;
  MEState = MEState;

  IOStartShown = 'out';
  IOEndShown = 'out';
  HideShow = 'show';

  _msDelta = 400;

  startChanged$ = new Subject<PointerEvent>();
  endChanged$ = new Subject<PointerEvent>();

  constructor(public meService: MediaEditService, private device: DeviceService) { }

  ngOnInit() {
    this.previousState = this.meService.state;
  }

  ngAfterViewInit() {
    const self = this;
    Promise.resolve(null).then(_ => this.HideShow = 'hide');
    // * [2018-08-09 14:44] For start and value
    self.startChanged$.pipe(map(ev =>
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

    self.endChanged$.pipe(map(ev =>
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
}
