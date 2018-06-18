import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MediaEditService, MEState, playerType, playerAction } from 'src/app/services/media-edit.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  pType = playerType;

  @ViewChild('video')
  ngVideo: ElementRef;
  videoEle: HTMLVideoElement;

  @ViewChild('youtube')
  ngYoutube: ElementRef;
  youtubeEle: HTMLIFrameElement;
  isInited = false;

  constructor(public dataService: MediaEditService) { }

  ngOnInit() {
    this.videoEle = this.ngVideo.nativeElement;
    this.youtubeEle = this.ngYoutube.nativeElement;
    this.eventTriggers();
    this.eventListeners();
    // * [2018-06-18 20:57] because this component might be initialized after the MEState.readyForPlayer, I need to deal with this situation
    if ((this.dataService.state === MEState.readyForPlayer) && (this.isInited === false)) {
      this.initMe();
      this.isInited = true;
    }
  }

  eventListeners() {
    const self = this;
    this.dataService.onStateChanged.subscribe((t) => {
      if (t === MEState.readyForPlayer) {
        if (this.isInited === false) {this.isInited = true; }
        self.initMe();
      }
    });
    this.dataService.onPlayerAction.subscribe((t) => {
      switch (t) {
        case playerAction.play:
          if (self.dataService.pType === self.pType.url) {
            this.videoEle.play();
          }
          break;
          case playerAction.pause:
          if (self.dataService.pType === self.pType.url) {
            this.videoEle.pause();
          }
          break;
          case playerAction.seek:
          if (self.dataService.pType === self.pType.url) {
            this.videoEle.currentTime = self.dataService.currentTime;
          }
          break;
        default:
          break;
      }
    });
  }

  eventTriggers() {
    const self = this;
    // * [2018-06-18 11:11] for MEState.canPlay
    this.videoEle.oncanplay = (ev) => {
      self.dataService.onStateChanged.next(MEState.canPlay);
    };
    // * [2018-06-18 11:11] for MEState.error
    this.videoEle.onerror = (ev) => {
      self.dataService.onStateChanged.next(MEState.error);
    };
    // * [2018-06-18 11:11] for MEState.waiting
    this.videoEle.onwaiting = (ev) => {
      self.dataService.onStateChanged.next(MEState.waiting);
    };
    // * [2018-06-18 11:11] for MEState.playing
    this.videoEle.onplay = (ev) => {
      self.dataService.onStateChanged.next(MEState.playing);
    };
    this.videoEle.onplaying = (ev) => {
      self.dataService.onStateChanged.next(MEState.playing);
    };
    // * [2018-06-18 11:11] for MEState.paused
    this.videoEle.onpause = (ev) => {
      self.dataService.onStateChanged.next(MEState.paused);
    };
    // * [2018-06-18 11:11] for MEState.stopped
    this.videoEle.onended = (ev) => {
      self.dataService.onStateChanged.next(MEState.stopped);
    };
    // ************************* TODO *****************************
  }

  initMe() {
// ******* TODO *******
    if (this.dataService.pType ===  playerType.url) {
      this.videoEle.src = this.dataService.url;
    }
  }
}
