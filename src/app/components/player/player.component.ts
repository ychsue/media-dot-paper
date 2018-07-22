import { Component, OnInit, ViewChild, ElementRef, OnDestroy, NgZone } from '@angular/core';
import { MediaEditService, MEState, playerAction } from 'src/app/services/media-edit.service';
import { YoutubeService } from 'src/app/services/youtube.service';
import { Subject, interval } from 'rxjs';
import { takeUntil, map, distinctUntilChanged } from 'rxjs/operators';
import { SafePipe } from 'src/app/pipes/safe.pipe';
import { MessageService, MessageTypes } from 'src/app/services/message.service';
import { PlayerType } from '../../vm/player-type.enum';
import { equalSegments } from '../../../../node_modules/@angular/router/src/url_tree';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnDestroy {

  pType = PlayerType;
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

  getCurrentTime(): number {
    const self = this;
    const meType = self.dataService.story.meType;
    if (meType === self.pType.youtubeID) {
      if (self.YTservice.isApiReady && !!self.YTservice.ytPlayer.getCurrentTime) {
        return self.YTservice.ytPlayer.getCurrentTime();
      } else {
        return -1;
      }
    } else {
      return self.videoEle.currentTime;
    }
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
    // * [2018-07-21 19:44] For CurrentTime
    interval(200).pipe(
      map(_ => self.getCurrentTime()),
      distinctUntilChanged()
    )
    .pipe(takeUntil(self.unSubscribed))
    .subscribe(t => {
      self.dataService.currentTime = t;
      // console.log(t);
    });

    // * For playerAction
    this.dataService.onPlayerAction
    .pipe(takeUntil(self.unSubscribed))
    .subscribe((t) => {
      const meType = self.dataService.story.meType;
      if (meType === self.pType.url || meType === self.pType.file) {
        switch (t) {
          case playerAction.play:
          self.videoEle.play();
          break;
          case playerAction.pause:
          self.videoEle.pause();
          break;
          case playerAction.seek:
          self.videoEle.currentTime = self.dataService.seekTime;
          break;
          default:
          break;
        }
      } else if (meType === self.pType.youtubeID) {
        switch (t) {
          case playerAction.play:
          self.YTservice.ytPlayer.playVideo();
          break;
          case playerAction.pause:
          self.YTservice.ytPlayer.pauseVideo();
          break;
          case playerAction.seek:
          self.YTservice.ytPlayer.seekTo(self.dataService.seekTime, true);
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
      self.ngZone.run(() => {
        switch (ev.data) {
          case YT.PlayerState.PLAYING:
            self.dataService.state = MEState.playing;
            break;
          case YT.PlayerState.PAUSED:
            self.dataService.state = MEState.paused;
            break;
          case YT.PlayerState.ENDED:
            self.dataService.state = MEState.stopped;
            break;
          default:
            break;
        }
      });
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
    const meType = this.dataService.story.meType;
    const urlOrId = this.dataService.story.urlOrID;
    if (meType ===  PlayerType.url) {
      if (YoutubeService.isYoutubeURL(urlOrId)) {
        this.dataService.story.meType = PlayerType.youtubeID;
        this.ytVId = YoutubeService.getYTId(urlOrId);
      } else {
        this.videoSrc = urlOrId;
      }
    } else if (meType === PlayerType.youtubeID) {
      if (YoutubeService.isYoutubeURL(urlOrId)) {
        this.ytVId = YoutubeService.getYTId(urlOrId);
      } else {
        this.ytVId = urlOrId;
      }
    } else if (meType === PlayerType.file) {
      this.videoSrc = urlOrId;
    }
  }
}
