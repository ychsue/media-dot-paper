import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MediaEditService, playerAction, MEState } from 'src/app/services/media-edit.service';
import { trigger, transition, style, animate, state } from '../../../../node_modules/@angular/animations';

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


  constructor(public meService: MediaEditService) { }

  ngOnInit() {
    this.previousState = this.meService.state;
  }

  ngAfterViewInit() {
    Promise.resolve(null).then(_ => this.HideShow = 'hide');
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
