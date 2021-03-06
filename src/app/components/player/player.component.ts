import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  NgZone,
  AfterViewChecked,
  EventEmitter,
  Output,
} from "@angular/core";
import {
  MediaEditService,
  MEState,
  playerAction,
} from "src/app/services/media-edit.service";
import { YoutubeService } from "src/app/services/youtube.service";
import { Subject, interval, from, fromEvent, of, merge } from "rxjs";
import {
  takeUntil,
  map,
  distinctUntilChanged,
  share,
  take,
  takeWhile,
  concat,
} from "rxjs/operators";
import { SafePipe } from "src/app/pipes/safe.pipe";
import { MessageService, MessageTypes } from "src/app/services/message.service";
import { PlayerType } from "../../vm/player-type.enum";
import { DeviceService } from "../../services/device.service";
import { CrossCompService } from "src/app/services/cross-comp.service";
import { WithClickService } from "src/app/services/WithClick/with-click.service";
import { GapiService } from "src/app/services/GAPI/gapi.service";
import { PageTextsService } from "src/app/services/page-texts.service";
import { IWinCacheMetaData } from "src/app/services/FS/_FS.declare";
import _toggleAudioVideo from "./_toggleAudioVideo";
import _loadMediaFromWinFile$$ from "./_loadMediaFromWinFile$$";
import { FsService } from "src/app/services/fs.service";

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.css", "../../common-use.css"],
})
export class PlayerComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Output()
  heightChange: EventEmitter<number> = new EventEmitter<number>();
  private _height = 0;

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

  @ViewChild("video", { static: true })
  ngVideo: ElementRef;

  @ViewChild("audio", { static: true })
  ngAudio: ElementRef;

  videoEle: HTMLVideoElement;
  audioEle: HTMLAudioElement;
  mediaEle: HTMLVideoElement | HTMLAudioElement;
  displayWho: "video" | "audio" | "YouTube";

  @ViewChild("youtube", { static: true })
  ngYoutube: ElementRef;
  youtubeEle: HTMLIFrameElement;
  isInited = false;
  _msInterval = 200;

  @ViewChild("container", { static: true })
  ngContainer: ElementRef;
  containerEle: HTMLDivElement;

  toggleAudioVideo: typeof _toggleAudioVideo;

  pts: IPlayerComp;
  constructor(
    public meService: MediaEditService,
    private YTservice: YoutubeService,
    private crossComp: CrossCompService, // keep videoEle in crossComp
    public msgService: MessageService,
    private ngZone: NgZone,
    private device: DeviceService,
    private withClickService: WithClickService,
    private gapiService: GapiService,
    public ptsService: PageTextsService,
    public fsService: FsService
  ) {
    const self = this;
    this.toggleAudioVideo = _toggleAudioVideo.bind(self);
    merge(ptsService.PTSReady$, ptsService.ptsLoaded$)
      .pipe(takeUntil(self.unSubscribed))
      .subscribe((_) => {
        self.pts = ptsService?.pts?.playerComp;
      });
  }

  ngOnInit() {
    const self = this;
    this.videoEle = this.ngVideo.nativeElement;
    this.audioEle = this.ngAudio.nativeElement;
    this.mediaEle = this.videoEle;
    this.crossComp.videoEle = this.videoEle;
    this.crossComp.mediaEle = this.mediaEle;
    this.youtubeEle = this.ngYoutube.nativeElement;
    this.containerEle = this.ngContainer.nativeElement;
    this.eventTriggers();
    this.eventListeners();
    // * [2018-06-18 20:57] because this component might be initialized after the MEState.readyForPlayer, I need to deal with this situation
    if (
      this.meService.state === MEState.readyForPlayer &&
      this.isInited === false
    ) {
      this.initMe();
      this.isInited = true;
    }
    if (this.device.isCordova && cordova.platformId === "ios") {
      self.mediaEle.setAttribute("playsinline", "true");
    }
    self.meService.state = MEState.playerReady;
  }

  ngOnDestroy(): void {
    this.unSubscribed.next(true);
    this.unSubscribed.complete();
    this.crossComp.videoEle = null;
    this.crossComp.mediaEle = null;
  }

  ngAfterViewChecked(): void {
    const ele = this.containerEle;
    // * [2018-11-06 11:38] Check height
    if (!!ele && ele.offsetHeight !== this._height) {
      this._height = ele.offsetHeight;
      this.heightChange.emit(this._height);
    }
  }

  getCurrentTime(): number {
    const self = this;
    const meType = self.meService.story.meType;
    if (meType === self.pType.youtubeID) {
      if (
        self.YTservice.isApiReady &&
        !!self.YTservice.ytPlayer.getCurrentTime
      ) {
        return self.YTservice.ytPlayer.getCurrentTime();
      } else {
        return -1;
      }
    } else {
      return self.mediaEle.currentTime;
    }
  }

  checkYoutubStateAndSetState() {
    const self = this;
    let state = -2;
    if (
      self.meService.story.meType === PlayerType.youtubeID &&
      !!self.YTservice.ytPlayer === true &&
      !!self.YTservice.ytPlayer.getPlayerState === true
    ) {
      const ytState = self.YTservice.ytPlayer.getPlayerState();
      // 0:ended, 1: playing, 2: paused, 3: buffering, 5: video cued
      if (self.meService.state !== MEState.playing && ytState === 1) {
        self.meService.state = MEState.playing;
      } else if (self.meService.state !== MEState.stopped && ytState === 0) {
        self.meService.state = MEState.stopped;
      } else if (self.meService.state !== MEState.paused && ytState === 2) {
        self.meService.state = MEState.paused;
      } else if (
        self.meService.state !== MEState.waiting &&
        (ytState === 3 || ytState === 5)
      ) {
        self.meService.state = MEState.waiting;
      }
      state = self.meService.state;
    }
    return state;
  }

  eventListeners() {
    const self = this;
    // * For readyForPlayer
    this.meService.onStateChanged
      .pipe(takeUntil(self.unSubscribed))
      .subscribe((t) => {
        if (t === MEState.readyForPlayer) {
          if (self.isInited === false) {
            self.isInited = true;
          }
          self.initMe();
          self.withClickService.withClick({
            title: !!self.pts ? self.pts.playDialogTitle : "提醒事項",
            content: !!self.pts
              ? self.pts.playDialogContent
              : "由於有時會媒體載入不全，請先按此鈕看看能否播放。若未播放，以YouTube為例，請先按影片的中央來播放，好讓YouTube確定你真的想看，它才有機會將控制權交給本APP",
            stYes: !!self.pts ? self.pts.playDialogYes : "播放",
            stNo: "",
          })(async (_: void) => {
            try {
              self.meService.onPlayerAction.next(playerAction.play);
            } catch (error) {
              self.msgService.alert(
                !!self.pts
                  ? self.pts.playDialogError
                  : "請點影片中央看看能否播放，否則有可能無法操縱影片播放"
              );
            }
            return;
          })();
        }
      });
    // * [2018-09-12 13:21] Check whether the media is ready
    self.meService.requestMediaReady$
      .pipe(takeUntil(self.unSubscribed))
      .subscribe((_) => {
        let isReady = false;
        if (
          self.meService.story.meType === PlayerType.youtubeID &&
          !!self.YTservice.ytPlayer === true
        ) {
          const ytState = self.checkYoutubStateAndSetState();
          isReady = ytState >= 0;
        } else {
          isReady = self.mediaEle.readyState === 4;
        }
        self.meService.responseMediaReady$.next(isReady);
      });
    // * [2018-07-21 19:44] For CurrentTime
    self.meService.onCurrentTimeChanged = interval(self._msInterval).pipe(
      map((_) => {
        if (self.meService.story.meType === self.pType.youtubeID) {
          const yState = self.checkYoutubStateAndSetState();
          return yState === -2 ? -1 : self.getCurrentTime();
        } else {
          return self.getCurrentTime();
        }
      }),
      distinctUntilChanged(),
      share()
    );
    self.meService.onCurrentTimeChanged
      .pipe(takeUntil(self.unSubscribed))
      .subscribe((t) => {
        self.meService.currentTime = t;
        // console.log(t);
      });

    let isDuringStart = false; // For iOS because its seek time might be earlier than the time you are seeking to
    let isDuringEnd = false;
    // * [2018-07-24 13:48] For repeating each frame
    self.meService.onCurrentTimeChanged
      .pipe(takeUntil(self.unSubscribed))
      .subscribe((t) => {
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
          } else if (
            self.meService.state === MEState.paused ||
            self.meService.state === MEState.canPlay
          ) {
            self.meService.currentTime = t;
          } else if (t > end - self._msInterval / 1000) {
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
    fromEvent(self.videoEle, "durationchange")
      .pipe(takeUntil(self.unSubscribed))
      .subscribe((_) => {
        self.meService.onPlayerAction.next(playerAction.getDuration);
        self.meService.availablePlaybackRates = [0.25, 0.5, 0.75, 1, 1.5, 2, 4];
      });
    self.YTservice.onReady.pipe(takeUntil(self.unSubscribed)).subscribe((_) => {
      self.meService.onPlayerAction.next(playerAction.getDuration);
      self.meService.availablePlaybackRates =
        self.YTservice.ytPlayer.getAvailablePlaybackRates();
    });

    // * For playerAction
    this.meService.onPlayerAction
      .pipe(takeUntil(self.unSubscribed))
      .subscribe((t) => {
        const meType = self.meService.story.meType;
        if (meType === self.pType.url || meType === self.pType.file) {
          try {
            switch (t) {
              case playerAction.play:
                self.mediaEle.play();
                if (self.mediaEle === self.audioEle) {
                  self.videoEle.pause();
                } else {
                  self.audioEle.pause();
                }
                break;
              case playerAction.pause:
                self.mediaEle.pause();
                break;
              case playerAction.seek:
                self.mediaEle.currentTime = self.meService.seekTime;
                break;
              case playerAction.getDuration:
                self.meService.duration = self.videoEle.duration;
                break;
              case playerAction.getVolume:
                self.meService._volume = self.mediaEle.volume;
                break;
              case playerAction.setVolume:
                self.mediaEle.volume = self.meService.volume;
                break;
              case playerAction.getPlaybackRate:
                self.meService._playbackRate = self.mediaEle.playbackRate;
                break;
              case playerAction.setPlaybackRate:
                self.mediaEle.playbackRate = self.meService.playbackRate;
                break;
              case playerAction.getAllowedPlaybackRate:
                self.meService.availablePlaybackRates = [
                  0.25, 0.5, 0.75, 1, 1.5, 2, 4,
                ];
                break;
              default:
                break;
            }
          } catch (error) {
            // For IE11
            console.log("Player.Component error at videoEle: " + error.message);
          }
        } else if (meType === self.pType.youtubeID) {
          const ytPlayer = self.YTservice.ytPlayer;
          if (!!ytPlayer === false) {
            return;
          }
          switch (t) {
            case playerAction.play:
              if (!!ytPlayer.playVideo) {
                ytPlayer.playVideo();
              }
              break;
            case playerAction.pause:
              if (!!ytPlayer.pauseVideo) {
                ytPlayer.pauseVideo();
              }
              break;
            case playerAction.seek:
              if (!!ytPlayer.seekTo) {
                ytPlayer.seekTo(self.meService.seekTime, true);
                const duration = ytPlayer.getDuration();
                if (self.meService.duration !== duration) {
                  self.meService.duration = duration;
                }
              }
              break;
            case playerAction.getDuration:
              if (!!ytPlayer.getDuration) {
                of(0)
                  .pipe(concat(interval(500)))
                  .pipe(
                    take(5),
                    takeWhile((_) => {
                      const duration = ytPlayer.getDuration();
                      if (!!duration) {
                        self.meService.duration = duration;
                      }
                      return !!duration === false;
                    })
                  )
                  .subscribe((_) => {});
              }
              break;
            case playerAction.getVolume:
              if (!!ytPlayer.getVolume) {
                self.meService._volume = ytPlayer.getVolume() / 100;
              }
              break;
            case playerAction.setVolume:
              if (!!ytPlayer.setVolume) {
                ytPlayer.setVolume(self.meService.volume * 100);
              }
              break;
            case playerAction.getPlaybackRate:
              if (!!ytPlayer.getPlaybackRate) {
                self.meService._playbackRate = ytPlayer.getPlaybackRate();
              }
              break;
            case playerAction.setPlaybackRate:
              if (!!ytPlayer.setPlaybackRate) {
                ytPlayer.setPlaybackRate(self.meService.playbackRate);
              }
              break;
            case playerAction.getAllowedPlaybackRate:
              if (!!ytPlayer.getAvailablePlaybackRates) {
                self.meService.availablePlaybackRates =
                  ytPlayer.getAvailablePlaybackRates();
              }
              break;
            default:
              break;
          }
        }
      });
    // * [2018-06-26 15:53] For Youtube stateChange
    self.YTservice.onStateChange
      .pipe(takeUntil(this.unSubscribed))
      .subscribe((ev) => {
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
      .subscribe((ev) => {
        if (self.meService.story.modifyTime === 0) {
          const data = (self.YTservice.ytPlayer as any).getVideoData();
          if (
            self.meService.story.makeTime ===
              self.meService.lastTimeCallInitMeFromUrl &&
            !!data &&
            !!data.title
          ) {
            self.meService.story.name = data.title;
          }
        }
        self.meService.state = MEState.canPlay;
      });
  }

  eventTriggers() {
    const isDebug = false;
    const showEvDbg = (ev: Event | string, name: string) => {
      if (isDebug) {
        console.log(name);
        console.log(ev);
      }
    };
    const self = this;
    const setEvents = (media: HTMLVideoElement | HTMLAudioElement) => {
      // * [2018-06-18 11:11] for MEState.canPlay
      media.oncanplay = (ev) => {
        showEvDbg(ev, "oncanplay");
        self.meService.state = MEState.canPlay;
      };
      // * [2018-06-18 11:11] for MEState.error
      media.onerror = (ev) => {
        showEvDbg(ev, "onerror");
        self.meService.state = MEState.error;
      };
      // * [2018-06-18 11:11] for MEState.waiting
      media.onwaiting = (ev) => {
        if (media.currentTime > 0 && !media.paused && media.readyState > 2) {
          // For windows UWP, onPlaying event may not be triggered.
          self.meService.state = MEState.playing;
        } else {
          self.meService.state = MEState.waiting;
        }
      };
      // * [2018-06-18 11:11] for MEState.playing
      media.onplay = (ev) => {
        self.meService.state = MEState.playing;
      };
      media.onplaying = (ev) => {
        showEvDbg(ev, "onplaying");
        self.meService.state = MEState.playing;
      };
      // * [2018-06-18 11:11] for MEState.paused
      media.onpause = (ev) => {
        showEvDbg(ev, "onpause");
        self.meService.state = MEState.paused;
      };

      // * [2018-06-18 11:11] for MEState.stopped
      media.onended = (ev) => {
        showEvDbg(ev, "onended");
        self.meService.state = MEState.stopped;
      };
      // ************************* TODO *****************************

      if (media === self.videoEle) {
        media.onloadedmetadata = (ev) => {
          showEvDbg(ev, "onloadedmetadata");
          const ele = ev.target as HTMLVideoElement;
          self.mediaEle =
            !!ele.videoHeight && !!ele.videoWidth
              ? self.videoEle
              : self.audioEle;
          self.onUpdateDisplay(PlayerType.url);
        };
      }
    };

    setEvents(self.videoEle);
    setEvents(self.audioEle);
  }

  initMe() {
    // ******* TODO *******
    const self = this;
    const meType = this.meService.story.meType;
    let urlOrId = this.meService.story.urlOrID;
    self.crossComp.isVideoEle = false;
    if (meType === PlayerType.url) {
      if (YoutubeService.isYoutubeURL(urlOrId)) {
        this.meService.story.meType = PlayerType.youtubeID;
        this.onUpdateDisplay(PlayerType.youtubeID);
        this.ytVId = YoutubeService.getYTId(urlOrId);
      } else {
        self.crossComp.isVideoEle = true;
        // ** [2021-04-25 07:35] Check whether it comes from google
        URL.revokeObjectURL(urlOrId);
        let fId = window["protocolCheck"].checkBrowser().isSafari
          ? self.gapiService.service.getFileIdFromUri(urlOrId)
          : "";
        (async () => {
          let blob: Blob;
          if (!!fId) {
            blob = (await self.gapiService.getGoogleDriveDataFromFileIdAsync(
              fId,
              "blob"
            )) as Blob;
            urlOrId = URL.createObjectURL(blob);
          }
          self.toggleAudioVideo(blob?.type, urlOrId);
        })();
      }
    } else if (meType === PlayerType.youtubeID) {
      this.onUpdateDisplay(PlayerType.youtubeID);
      if (YoutubeService.isYoutubeURL(urlOrId)) {
        this.ytVId = YoutubeService.getYTId(urlOrId);
      } else {
        this.ytVId = urlOrId;
      }
    } else if (meType === PlayerType.file) {
      this.crossComp.isVideoEle = true;
      let metadata: IWinCacheMetaData;
      try {
        metadata = JSON.parse(urlOrId);
      } catch (error) {
        console.log(`playerComponent::initMe::file: Cannot parse metadata`);
      }

      if (!!metadata) {
        if (this.device.isWinRT) {
          (
            _loadMediaFromWinFile$$.bind(self) as typeof _loadMediaFromWinFile$$
          )({ metadata }).then((_) =>
            console.log("PlayerComponent::initMe Loading WinFile")
          );
          // ************************** 2021/06/03 TODO ***************************
        } else {
          self.toggleAudioVideo(metadata.type, metadata.token);
        }
      }
    }
    // * [2018-09-12 11:48] It might have been loaded
    if (this.mediaEle.readyState === 4) {
      setTimeout(() => {
        self.meService.state = MEState.paused;
      }, 10);
    }
  }

  onVideoPlayOrPause(ev: MouseEvent) {
    // ev.preventDefault();
    const fun = () => {
      const state = this.meService.state;
      if (
        state === MEState.paused ||
        state === MEState.readyForPlayer ||
        state === MEState.canPlay
      ) {
        this.meService.onPlayerAction.next(playerAction.play);
      } else {
        this.meService.onPlayerAction.next(playerAction.pause);
      }
    };
    this.crossComp.clickVideoLoad_justIOS(fun.bind(this));
    fun();
  }

  onUpdateDisplay(type: PlayerType) {
    // console.log(`meType: ${type}`);
    switch (type) {
      case PlayerType.file:
      case PlayerType.url:
        this.displayWho = this.mediaEle === this.videoEle ? "video" : "audio";
        break;
      case PlayerType.youtubeID:
        this.displayWho = "YouTube";
        break;
      default:
        break;
    }
  }
}
