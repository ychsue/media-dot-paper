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

  constructor(public dataService: MediaEditService, private YTservice: YoutubeService,
    private msgService: MessageService, private ngZone: NgZone, private device: DeviceService) {
  }

  ngOnInit() {
    const self = this;
    this.videoEle = this.ngVideo.nativeElement;
    this.youtubeEle = this.ngYoutube.nativeElement;
    this.eventTriggers();
    this.eventListeners();
    // * [2018-06-18 20:57] because this component might be initialized after the MEState.readyForPlayer, I need to deal with this situation
    if ((this.dataService.state === MEState.readyForPlayer) && (this.isInited === false)) {
      this.initMe();
      this.isInited = true;
    }
    if (this.device.isCordova && cordova.platformId === 'ios') {
      self.videoEle.setAttribute("playsinline", "true");
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
    self.dataService.onCurrentTimeChanged = interval(self._msInterval)
    .pipe(
      map(_ => self.getCurrentTime()),
      distinctUntilChanged(),
      share()
    );
    self.dataService.onCurrentTimeChanged
    .pipe(takeUntil(self.unSubscribed))
    .subscribe(t => {
      self.dataService.currentTime = t;
      // console.log(t);
    });

    let isDuringStart = false; // For iOS because its seek time might be earlier than the time you are seeking to
    let isDuringEnd = false;
    // * [2018-07-24 13:48] For repeating each frame
    self.dataService.onCurrentTimeChanged
    .pipe(takeUntil(self.unSubscribed))
    .subscribe(t => {
      try {
        let start = 0;
        let end = self.dataService.duration - 0.1;
        const iFrame = self.dataService.story.iFrame;
        if (iFrame >= 0) {
          const frame = self.dataService.story.frames[iFrame];
          if (!!frame) {
            start = frame.start;
            end = frame.end;
          }
        }
        if (t < start) {
          if (isDuringStart === false) {
            isDuringStart = true;
            self.dataService.seekTime = start;
          }
        } else if (t > (end - (self._msInterval / 1000))) {
          if (isDuringEnd === false) {
            isDuringEnd = true;
            setTimeout(() => {
              isDuringEnd = false;
              self.dataService.seekTime = start;
              if (self.dataService.isRepeat === false) {
                self.dataService.onPlayerAction.next(playerAction.pause);
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
      self.dataService.duration = self.videoEle.duration;
      self.dataService.availablePlaybackRates = [0.25, 0.5, 0.75, 1, 1.5, 2, 4];
    });
    self.YTservice.onReady
    .pipe( takeUntil(self.unSubscribed))
    .subscribe(_ => {
      self.dataService.duration = self.YTservice.ytPlayer.getDuration();
      self.dataService.availablePlaybackRates = self.YTservice.ytPlayer.getAvailablePlaybackRates();
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
          case playerAction.getDuration:
          self.dataService.duration = self.videoEle.duration;
          break;
          case playerAction.getVolume:
          self.dataService._volume = self.videoEle.volume;
          break;
          case playerAction.setVolume:
          self.videoEle.volume = self.dataService.volume;
          break;
          case playerAction.getPlaybackRate:
          self.dataService._playbackRate = self.videoEle.playbackRate;
          break;
          case playerAction.setPlaybackRate:
          self.videoEle.playbackRate = self.dataService.playbackRate;
          break;
          case playerAction.getAllowedPlaybackRate:
          self.dataService.availablePlaybackRates = [0.25, 0.5, 0.75, 1, 1.5, 2, 4];
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
            ytPlayer.seekTo(self.dataService.seekTime, true);
          }
          break;
          case playerAction.getDuration:
          if (!!ytPlayer && !!ytPlayer.getDuration) {
            self.dataService.duration = ytPlayer.getDuration();
          }
          break;
          case playerAction.getVolume:
          self.dataService._volume = ytPlayer.getVolume() / 100;
          break;
          case playerAction.setVolume:
          ytPlayer.setVolume(self.dataService.volume * 100);
          break;
          case playerAction.getPlaybackRate:
          self.dataService._playbackRate = ytPlayer.getPlaybackRate();
          break;
          case playerAction.setPlaybackRate:
          ytPlayer.setPlaybackRate(self.dataService.playbackRate);
          break;
          case playerAction.getAllowedPlaybackRate:
          self.dataService.availablePlaybackRates = ytPlayer.getAvailablePlaybackRates();
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

  onVideoPlayOrPause(ev: MouseEvent) {
    ev.preventDefault();
    const state = this.dataService.state;
    if (state === MEState.paused || state === MEState.readyForPlayer || state === MEState.canPlay) {
      this.dataService.onPlayerAction.next(playerAction.play);
    } else {
      this.dataService.onPlayerAction.next(playerAction.pause);
    }
  }
}
