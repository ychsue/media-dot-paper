import { Component, OnInit, ViewChild, ElementRef, OnDestroy, NgZone } from '@angular/core';
import { MediaEditService, MEState, playerAction } from 'src/app/services/media-edit.service';
import { YoutubeService } from 'src/app/services/youtube.service';
import { Subject, interval, from, fromEvent } from 'rxjs';
import { takeUntil, map, distinctUntilChanged, merge, share } from 'rxjs/operators';
import { SafePipe } from 'src/app/pipes/safe.pipe';
import { MessageService, MessageTypes } from 'src/app/services/message.service';
import { PlayerType } from '../../vm/player-type.enum';
import { equalSegments } from '../../../../node_modules/@angular/router/src/url_tree';
import { DeviceService } from '../../services/device.service';

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
  _msInterval = 200;

  constructor(public meService: MediaEditService, private YTservice: YoutubeService,
    private msgService: MessageService, private ngZone: NgZone, private device: DeviceService) {
  }

  ngOnInit() {
    const self = this;
    this.videoEle = this.ngVideo.nativeElement;
    this.youtubeEle = this.ngYoutube.nativeElement;
    this.eventTriggers();
    this.eventListeners();
    // * [2018-06-18 20:57] because this component might be initialized after the MEState.readyForPlayer, I need to deal with this situation
    if ((this.meService.state === MEState.readyForPlayer) && (this.isInited === false)) {
      this.initMe();
      this.isInited = true;
    }
    if (this.device.isCordova && cordova.platformId === 'ios') {
      self.videoEle.setAttribute("playsinline", "true");
    }
    self.meService.state = MEState.playerReady;
  }

  ngOnDestroy(): void {
    this.unSubscribed.next(true);
    this.unSubscribed.complete();
  }

  getCurrentTime(): number {
    const self = this;
    const meType = self.meService.story.meType;
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
    this.meService.onStateChanged
    .pipe(takeUntil(self.unSubscribed))
    .subscribe((t) => {
      if (t === MEState.readyForPlayer) {
        if (self.isInited === false) {self.isInited = true; }
        self.initMe();
      }
    });
    // * [2018-07-21 19:44] For CurrentTime
    self.meService.onCurrentTimeChanged = interval(self._msInterval)
    .pipe(
      map(_ => self.getCurrentTime()),
      distinctUntilChanged(),
      share()
    );
    self.meService.onCurrentTimeChanged
    .pipe(takeUntil(self.unSubscribed))
    .subscribe(t => {
      self.meService.currentTime = t;
      // console.log(t);
    });

    let isDuringStart = false; // For iOS because its seek time might be earlier than the time you are seeking to
    let isDuringEnd = false;
    // * [2018-07-24 13:48] For repeating each frame
    self.meService.onCurrentTimeChanged
    .pipe(takeUntil(self.unSubscribed))
    .subscribe(t => {
      try {
        let start = 0;
        let end = self.meService.duration - 0.1;
        const iFrame = self.meService.story.iFrame;
        if (iFrame >= 0) {
          const frame = self.meService.story.frames[iFrame];
          if (!!frame) {
            start = frame.start;
            end = frame.end;
          }
        }
        if (t < start) {
          if (isDuringStart === false) {
            isDuringStart = true;
            self.meService.seekTime = start;
          }
        } else if (t > (end - (self._msInterval / 1000))) {
          if (isDuringEnd === false) {
            isDuringEnd = true;
            setTimeout(() => {
              isDuringEnd = false;
              self.meService.seekTime = start;
              if (self.meService.isRepeat === false) {
                self.meService.onPlayerAction.next(playerAction.pause);
              } else {
                self.meService.repeatStart$.next(iFrame);
              }
            }, (end - t) * 1000);
          }
        } else {
          if (isDuringStart === true) {
            isDuringStart = false;
          }
        }
      } catch (error) {
        console.error(error);
      }
    });

    // * [2018-07-22 22:16] Update Duration & availablePlaybackRates
    fromEvent(self.videoEle, 'durationchange')
    // .pipe(merge(fromEvent(self.videoEle, 'loadstart')))
    .pipe( takeUntil(self.unSubscribed))
    .subscribe(_ => {
      self.meService.duration = self.videoEle.duration;
      self.meService.availablePlaybackRates = [0.25, 0.5, 0.75, 1, 1.5, 2, 4];
    });
    self.YTservice.onReady
    .pipe( takeUntil(self.unSubscribed))
    .subscribe(_ => {
      self.meService.duration = self.YTservice.ytPlayer.getDuration();
      self.meService.availablePlaybackRates = self.YTservice.ytPlayer.getAvailablePlaybackRates();
    });

    // * For playerAction
    this.meService.onPlayerAction
    .pipe(takeUntil(self.unSubscribed))
    .subscribe((t) => {
      const meType = self.meService.story.meType;
      if (meType === self.pType.url || meType === self.pType.file) {
        switch (t) {
          case playerAction.play:
          self.videoEle.play();
          break;
          case playerAction.pause:
          self.videoEle.pause();
          break;
          case playerAction.seek:
          self.videoEle.currentTime = self.meService.seekTime;
          break;
          case playerAction.getDuration:
          self.meService.duration = self.videoEle.duration;
          break;
          case playerAction.getVolume:
          self.meService._volume = self.videoEle.volume;
          break;
          case playerAction.setVolume:
          self.videoEle.volume = self.meService.volume;
          break;
          case playerAction.getPlaybackRate:
          self.meService._playbackRate = self.videoEle.playbackRate;
          break;
          case playerAction.setPlaybackRate:
          self.videoEle.playbackRate = self.meService.playbackRate;
          break;
          case playerAction.getAllowedPlaybackRate:
          self.meService.availablePlaybackRates = [0.25, 0.5, 0.75, 1, 1.5, 2, 4];
          break;
          default:
          break;
        }
      } else if (meType === self.pType.youtubeID) {
        const ytPlayer = self.YTservice.ytPlayer;
        if (!!ytPlayer === false) {return; }
        switch (t) {
          case playerAction.play:
          ytPlayer.playVideo();
          break;
          case playerAction.pause:
          ytPlayer.pauseVideo();
          break;
          case playerAction.seek:
          if (!!ytPlayer.seekTo) {
            ytPlayer.seekTo(self.meService.seekTime, true);
          }
          break;
          case playerAction.getDuration:
          if (!!ytPlayer && !!ytPlayer.getDuration) {
            self.meService.duration = ytPlayer.getDuration();
          }
          break;
          case playerAction.getVolume:
          self.meService._volume = ytPlayer.getVolume() / 100;
          break;
          case playerAction.setVolume:
          ytPlayer.setVolume(self.meService.volume * 100);
          break;
          case playerAction.getPlaybackRate:
          self.meService._playbackRate = ytPlayer.getPlaybackRate();
          break;
          case playerAction.setPlaybackRate:
          ytPlayer.setPlaybackRate(self.meService.playbackRate);
          break;
          case playerAction.getAllowedPlaybackRate:
          self.meService.availablePlaybackRates = ytPlayer.getAvailablePlaybackRates();
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
            self.meService.state = MEState.playing;
            break;
          case YT.PlayerState.PAUSED:
            self.meService.state = MEState.paused;
            break;
          case YT.PlayerState.ENDED:
            self.meService.state = MEState.stopped;
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
      if (self.meService.story.modifyTime === 0) {
        const data = (self.YTservice.ytPlayer as any).getVideoData();
        if (!!data && !!data.title) {
          self.meService.story.name = data.title;
        }
      }
      self.meService.state = MEState.canPlay;
    });
  }

  eventTriggers() {
    const self = this;
    // * [2018-06-18 11:11] for MEState.canPlay
    this.videoEle.oncanplay = (ev) => {
      self.meService.state = MEState.canPlay;
    };
    // * [2018-06-18 11:11] for MEState.error
    this.videoEle.onerror = (ev) => {
      self.meService.state = MEState.error;
    };
    // * [2018-06-18 11:11] for MEState.waiting
    this.videoEle.onwaiting = (ev) => {
      self.meService.state = MEState.waiting;
    };
    // * [2018-06-18 11:11] for MEState.playing
    this.videoEle.onplay = (ev) => {
      self.meService.state = MEState.playing;
    };
    this.videoEle.onplaying = (ev) => {
      self.meService.state = MEState.playing;
    };
    // * [2018-06-18 11:11] for MEState.paused
    this.videoEle.onpause = (ev) => {
      self.meService.state = MEState.paused;
    };
    // * [2018-06-18 11:11] for MEState.stopped
    this.videoEle.onended = (ev) => {
      self.meService.state = MEState.stopped;
    };
    // ************************* TODO *****************************
  }

  initMe() {
    // ******* TODO *******
    const meType = this.meService.story.meType;
    const urlOrId = this.meService.story.urlOrID;
    if (meType ===  PlayerType.url) {
      if (YoutubeService.isYoutubeURL(urlOrId)) {
        this.meService.story.meType = PlayerType.youtubeID;
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

  onVideoPlayOrPause(ev: MouseEvent) {
    // ev.preventDefault();
    const state = this.meService.state;
    if (state === MEState.paused || state === MEState.readyForPlayer || state === MEState.canPlay) {
      this.meService.onPlayerAction.next(playerAction.play);
    } else {
      this.meService.onPlayerAction.next(playerAction.pause);
    }
  }
}
