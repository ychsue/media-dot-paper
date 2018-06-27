import { Component, OnInit, ViewChild, ElementRef, OnDestroy, NgZone } from '@angular/core';
import { MediaEditService, MEState, playerType, playerAction } from 'src/app/services/media-edit.service';
import { YoutubeService } from 'src/app/services/youtube.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SafePipe } from 'src/app/pipes/safe.pipe';
import { MessageService, MessageTypes } from 'src/app/services/message.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnDestroy {

  pType = playerType;
  unSubscribed = new Subject<boolean>();

  videoSrc: string;

  private _ytVId: string;
  public get ytVId(): string {
    return this._ytVId;
  }
  public set ytVId(v: string) {
    this.YTservice.loadURLforPlayer(this.youtubeEle, v);
    this._ytVId = v;
  }

  @ViewChild('video')
  ngVideo: ElementRef;
  videoEle: HTMLVideoElement;

  @ViewChild('youtube')
  ngYoutube: ElementRef;
  youtubeEle: HTMLIFrameElement;
  isInited = false;

  constructor(public dataService: MediaEditService, private YTservice: YoutubeService,
    private msgService: MessageService, private ngZone: NgZone) {
  }

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

  ngOnDestroy(): void {
    this.unSubscribed.next(true);
    this.unSubscribed.complete();
  }

  eventListeners() {
    const self = this;
    // * For readyForPlayer
    this.dataService.onStateChanged
    .pipe(takeUntil(self.unSubscribed))
    .subscribe((t) => {
      if (t === MEState.readyForPlayer) {
        if (self.isInited === false) {self.isInited = true; }
        self.initMe();
      }
    });
    // * For playerAction
    this.dataService.onPlayerAction
    .pipe(takeUntil(self.unSubscribed))
    .subscribe((t) => {
      if (self.dataService.pType === self.pType.url || self.dataService.pType === self.pType.file) {
        switch (t) {
          case playerAction.play:
          self.videoEle.play();
          break;
          case playerAction.pause:
          self.videoEle.pause();
          break;
          case playerAction.seek:
          self.videoEle.currentTime = self.dataService.currentTime;
          break;
          default:
          break;
        }
      } else if (self.dataService.pType === self.pType.youtubeID) {
        switch (t) {
          case playerAction.play:
          self.YTservice.ytPlayer.playVideo();
          break;
          case playerAction.pause:
          self.YTservice.ytPlayer.pauseVideo();
          break;
          case playerAction.seek:
          self.YTservice.ytPlayer.seekTo(self.dataService.currentTime, true);
          break;
          default:
          break;
        }
      }
    });
    // * [2018-06-26 15:53] For Youtube stateChange
    self.YTservice.onStateChange
    .pipe(takeUntil(this.unSubscribed))
    .subscribe( (ev) => {
        switch (ev.data) {
          case YT.PlayerState.PLAYING:
            self.dataService.state = MEState.playing;
            break;
          case YT.PlayerState.PAUSED:
            self.dataService.state = MEState.paused;
            break;
          default:
            break;
        }
    });
    // * [2018-06-26 16:50] For Youtube Ready
    self.YTservice.onReady
    .pipe(takeUntil(this.unSubscribed))
    .subscribe( (ev) => {
      self.dataService.state = MEState.canPlay;
    });
  }

  eventTriggers() {
    const self = this;
    // * [2018-06-18 11:11] for MEState.canPlay
    this.videoEle.oncanplay = (ev) => {
      self.dataService.state = MEState.canPlay;
    };
    // * [2018-06-18 11:11] for MEState.error
    this.videoEle.onerror = (ev) => {
      self.dataService.state = MEState.error;
    };
    // * [2018-06-18 11:11] for MEState.waiting
    this.videoEle.onwaiting = (ev) => {
      self.dataService.state = MEState.waiting;
    };
    // * [2018-06-18 11:11] for MEState.playing
    this.videoEle.onplay = (ev) => {
      self.dataService.state = MEState.playing;
    };
    this.videoEle.onplaying = (ev) => {
      self.dataService.state = MEState.playing;
    };
    // * [2018-06-18 11:11] for MEState.paused
    this.videoEle.onpause = (ev) => {
      self.dataService.state = MEState.paused;
    };
    // * [2018-06-18 11:11] for MEState.stopped
    this.videoEle.onended = (ev) => {
      self.dataService.state = MEState.stopped;
    };
    // ************************* TODO *****************************
  }

  initMe() {
    // ******* TODO *******
    if (this.dataService.pType ===  playerType.url) {
      if (YoutubeService.isYoutubeURL(this.dataService.urlOrId)) {
        this.dataService.pType = playerType.youtubeID;
        this.ytVId = YoutubeService.getYTId(this.dataService.urlOrId);
      } else {
        this.videoSrc = this.dataService.urlOrId;
      }
    } else if (this.dataService.pType === playerType.youtubeID) {
      if (YoutubeService.isYoutubeURL(this.dataService.urlOrId)) {
        this.ytVId = YoutubeService.getYTId(this.dataService.urlOrId);
      } else {
        this.ytVId = this.dataService.urlOrId;
      }
    } else if (this.dataService.pType === playerType.file) {
      this.videoSrc = this.dataService.urlOrId;
    }
  }
}
