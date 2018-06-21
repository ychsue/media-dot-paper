import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MediaEditService, MEState, playerType, playerAction } from 'src/app/services/media-edit.service';
import { YoutubeService } from 'src/app/services/youtube.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnDestroy {

  pType = playerType;
  unSubscribed = new Subject<boolean>();

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

  constructor(public dataService: MediaEditService, private YTservice: YoutubeService) {
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
    this.dataService.onStateChanged
    .pipe(takeUntil(self.unSubscribed))
    .subscribe((t) => {
      if (t === MEState.readyForPlayer) {
        if (self.isInited === false) {self.isInited = true; }
        self.initMe();
      }
    });
    this.dataService.onPlayerAction
    .pipe(takeUntil(self.unSubscribed))
    .subscribe((t) => {
      switch (t) {
        case playerAction.play:
          if (self.dataService.pType === self.pType.url) {
            self.videoEle.play();
          } else if (self.dataService.pType === self.pType.youtubeID) {
            self.YTservice.ytPlayer.playVideo();
          }
          break;
          case playerAction.pause:
          if (self.dataService.pType === self.pType.url) {
            self.videoEle.pause();
          } else if (self.dataService.pType === self.pType.youtubeID) {
            self.YTservice.ytPlayer.pauseVideo();
          }
          break;
          case playerAction.seek:
          if (self.dataService.pType === self.pType.url) {
            self.videoEle.currentTime = self.dataService.currentTime;
          } else if (self.dataService.pType === self.pType.youtubeID) {
            self.YTservice.ytPlayer.seekTo(self.dataService.currentTime, true);
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
      if (YoutubeService.isYoutubeURL(this.dataService.urlOrId)) {
        this.dataService.pType = playerType.youtubeID;
        this.ytVId = YoutubeService.getYTId(this.dataService.urlOrId);
      } else {
        this.videoEle.src = this.dataService.urlOrId;
      }
    } else if (this.dataService.pType === playerType.youtubeID) {
      if (YoutubeService.isYoutubeURL(this.dataService.urlOrId)) {
        this.ytVId = YoutubeService.getYTId(this.dataService.urlOrId);
      } else {
        this.ytVId = this.dataService.urlOrId;
      }
    }
  }
}
