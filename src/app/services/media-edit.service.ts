import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { StoryService } from './story.service';
import { PlayerType } from '../vm/player-type.enum';
import { AdService } from './ad.service';
import { DbService } from './db.service';
import { FsService } from './fs.service';
import { MessageService, MessageTypes } from './message.service';
import { concatAll, map, shareReplay, concat, first } from 'rxjs/operators';
import { PageTextsService } from './page-texts.service';
import { Story, IStory } from '../vm/story';
import { StoryGSetting } from '../vm/story-g-setting';
import { SSutterParameters, SpeechSynthesisService } from './speech-synthesis.service';
import { GvService, PageType } from './gv.service';
import { DeviceService } from './device.service';
import { StringHelper, ProtocolActionType } from '../extends/string-helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MediaEditService {

  _onStateChanged: Subject<MEState>; // Just for subscribe, if you want to trigger it, set ~self.state~.
  public get onStateChanged(): Observable<MEState> {
    return this._onStateChanged;
  }

  requestMediaReady$ = new Subject<null>();  // Subscribed by player
  responseMediaReady$ = new Subject<boolean>(); // emmited by player

  onPlayerAction: Subject<playerAction>;

  PlayerType = PlayerType;

  private _state: MEState;
  public get state(): MEState {
    return this._state;
  }
  public set state(v: MEState) {
    if (this._state !== v && !!this._onStateChanged) {
      this._onStateChanged.next(v);
    }
    this._state = v;
  }

  onCurrentTimeChanged: Observable<number>;

  private _duration = 100;
  public set duration(v: number) {
    this._duration = v;
  }
  public get duration(): number {
    return (!!this._duration && (this._duration !== Infinity)) ? this._duration : 100;
  }

  public _volume = 1; // **************** TODO *******************
  public get volume(): number {
    return this._volume;
  }
  public set volume(v: number) {
    this._volume = v;
    this.setVolumeIntoFrame();
  }

  // ********************** TODO *************************
  public _playbackRate = 1;
  public get playbackRate(): number {
    return this._playbackRate;
  }
  public set playbackRate(v: number) {
    this._playbackRate = v;
    this.setPlaybackRateIntoFrame();
  }

  public availablePlaybackRates: number[] = [0.25, 0.5, 0.75, 1, 1.5, 2, 4];

  story = new Story();
  blob: Blob;

  currentTime = 0;
  isRepeat = true;
  currentIFrameOnT = -1;

  private _seekTime = 0;
  public set seekTime(v: number) {
    this._seekTime = v;
    this.onPlayerAction.next(playerAction.seek);
  }
  public get seekTime(): number {
    return this._seekTime;
  }

  sideClickType = SideClickType.none;

  private _setiFrame$ = new Subject<number>();
  setiFrame$ = this._setiFrame$.pipe(shareReplay(1));

  repeatStart$ = new Subject<number>();

  lastTimeCallInitMeFromUrl = 0;

  isToShowList = false;

  private _isSideMani = true;
  public get isSideMani(): boolean {
    return this._isSideMani && this.isToShowList;
  }
  public set isSideMani(v: boolean) { // Force it to be false when isToShowList is false
    this._isSideMani = v && this.isToShowList;
  }

  isToShowStoryGSetting = false;

  isHideMeSectionDashboard = false;

  pts: IPageTexts;

  constructor(private adService: AdService,
              private fsService: FsService,
              private msgService: MessageService,
              private db: DbService,
              private ptsService: PageTextsService,
              private storyService: StoryService,
              private SSService: SpeechSynthesisService,
              private gv: GvService,
              private device: DeviceService,
              private http: HttpClient
  ) {
    const self = this;
    self.ptsService.PTSReady$.subscribe(_ => {
      self.pts = self.ptsService.pts;
      self.story = new Story(self.pts);
    });
    self.ptsService.ptsLoaded$.subscribe(_ => {
      self.pts = self.ptsService.pts;
    });
    this._onStateChanged  = new Subject<MEState>();
    this.onPlayerAction = new Subject<playerAction>();
    this.state = MEState.initialized;
    // * [2018-08-25 21:26] light up setiFrame$
    this.setiFrame$.subscribe();
    // * [2019-02-17 18:17] handle onactivated event
    self.device.onMyActivated$.subscribe(self.onActivatedHandler.bind(self));
  }

  initMe(data: Blob| IStory| string, pType: PlayerType = PlayerType.auto) {
    // * [2018-08-15 16:25] Try to show admob
    this.adService.showInterstitial();
    // * [2018-07-19 17:58] pause previous action
    this.onPlayerAction.next(playerAction.pause);
    // * [2018-07-19 17:59] Start to initialize it.
    this.state = MEState.parsing;
    // * [2018-06-20 11:00] Check the type of service is
    if (pType !== PlayerType.auto) {
      this.story.meType = pType;
    } else {
      if ((typeof data) === 'string') {
        this.story = new Story(this.pts);
        this.lastTimeCallInitMeFromUrl = this.story.makeTime;
        this.story.meType = PlayerType.url;
      } else if (!!data['makeTime']) {
        this.story = data as IStory;
        this.setiFrame(this.story.iFrame); // TODO: It is for avoiding iFrame!=-1 so that the utterPara hasn't been updated.
      } else if (!!(data as Blob)) {
        this.story = new Story(this.pts);
        this.story.meType = PlayerType.file;
      } else {
        this.state = MEState.parseFailed;
        return;
      }
    }

    if (!!data['makeTime']) {
      // * [2018-07-19 13:41] If input is a story
    } else if ((this.story.meType === PlayerType.url) || (this.story.meType === PlayerType.youtubeID)) {
      this.story.urlOrID = data as string;
      this.story.title = this.story.urlOrID;
      this.story.name = this.story.title.slice(this.story.title.lastIndexOf('/') + 1);
    } else if (this.story.meType === PlayerType.file) {
      this.blob = data as Blob;
      this.story.urlOrID = window.URL.createObjectURL(this.blob);
      if (!!(data as File)) {
        this.story.title = this.story.fileName = (data as File).name;
        this.story.name = this.story.title;
      }
    }

    // * [2018-10-17 10:31] Since we have anewed the story, force it to set its gSetting
    if (!!this.story.gSetting === false) {
      this.story.gSetting = new StoryGSetting();
    }
    this.story.gSetting.utterPara = this.SSService.updateUtterParaWithVoice(this.story.gSetting.utterPara);

    this.state = MEState.readyForPlayer;

    // * [2018-07-23 10:16] Update the duration & playbackRates
    if (this.story.meType !== PlayerType.youtubeID) {
      this.onPlayerAction.next(playerAction.getDuration);
      this.onPlayerAction.next(playerAction.getAllowedPlaybackRate);
    }

    // * [2018-08-20 12:44] Update viewTime if it has been stored before
    if (this.story.modifyTime !== 0) {
      this.story.viewTime = Date.now();
      this.onUpdateStory$$();
    }
  }

  setiFrame(i: number) {
    const self = this;
    self.isToShowStoryGSetting = false;

    if (!!self.story) {
      // **************************** TODO ********************************************
      self.story.iFrame = i;
      self.setVolumeFromFrame();
      self.setPlaybackRateFromFrame();
      self._setiFrame$.next(i);
    } else {
      self.msgService.alert(`Problem in setiFrame(${i})`);
    }
  }

  setVolumeFromFrame(i: number = Number.NaN) {
    const self = this;
    if (!!self.story) {
      i = (Number.isNaN(i)) ? self.story.iFrame : i;
      const setFromDefault = () => {
        self._volume = (!!self.story.gSetting) ? self.story.gSetting.volume : 1;
      };
      if (i >= 0) { // if it is a frame.
        const frame = self.story.frames[i];
        if (!!frame.useDefVP) {
          setFromDefault();
        } else {
          self._volume = frame.volume;
        }
      } else { // for all
        setFromDefault();
      }
      self.onPlayerAction.next(playerAction.setVolume);
    } else {
      self.msgService.alert(`Problem in setVolume`);
    }
  }

  setPlaybackRateFromFrame(i: number = Number.NaN) {
    const self = this;
    if (!!self.story) {
      i = (Number.isNaN(i)) ? self.story.iFrame : i;
      const setFromDefault = () => {
        self._playbackRate = (!!self.story.gSetting) ? self.story.gSetting.rate : 1;
      };
      if (i >= 0) { // if it is a frame.
        const frame = self.story.frames[i];
        if (!!frame.useDefVP) {
          setFromDefault();
        } else {
          self._playbackRate = frame.rate;
        }
      } else { // for whole story
        setFromDefault();
      }
      self.onPlayerAction.next(playerAction.setPlaybackRate);
    } else {
      self.msgService.alert(`Problem in setPlaybackRate`);
    }
  }

  /**
   * Provide self._volume at first.
   */
  setVolumeIntoFrame() {
    const self = this;
    if (!!self.story) {
      const i = self.story.iFrame;
      if (i >= 0) { // if it is a frame.
        const frame = self.story.frames[i];
        frame.volume = self._volume;
      } else { // for all
        if (!!self.story.gSetting) {
          self.story.gSetting.volume = self._volume;
        }
      }
      self.onPlayerAction.next(playerAction.setVolume);
    } else {
      self.msgService.alert(`Problem in setVolume`);
    }
  }

    /**
   * Provide self._playbackRate at first.
   */
  setPlaybackRateIntoFrame() {
    const self = this;
    if (!!self.story) {
      const i = self.story.iFrame;
      if (i >= 0) { // if it is a frame.
        const frame = self.story.frames[i];
        frame.rate = self._playbackRate;
      } else { // for whole story
        if (!!self.story.gSetting) {
          self.story.gSetting.rate = self._playbackRate;
        }
      }
      self.onPlayerAction.next(playerAction.setPlaybackRate);
    } else {
      self.msgService.alert(`Problem in setPlaybackRate`);
    }
  }


  async onSaveStory$$() {
    const story = this.story;
    story.modifyTime = story.viewTime = Date.now();
    const self = this;
    self.gv.appComp.startProgress("請稍後", "處理中");
    if (story.meType === PlayerType.file) {
      const isSaved = await this.fsService.getFile$(story.fileName, true).pipe(map(fEntry => {
        return self.fsService.writeFile$(fEntry, self.blob);
      }), concatAll()).toPromise();
      // * [2018-08-05 17:23] if it is saved, renew its URL
      if (isSaved === true) {
        story.urlOrID = (await this.fsService.getFile$(story.fileName).toPromise()).toURL();
      }

      self.msgService.pushMessage({type: MessageTypes.Info, message: `The file ${story.fileName} is stored: ${isSaved}`});
    }
    delete story['id'];
    const insert = await this.storyService.upsertAStoryAsync(story);
    // * [2018-07-25 19:04] Change its state to 'Update'
    story['id'] = insert[0].affectedRows[0].id;
    this.sideClickType = SideClickType.select;
    self.gv.appComp.stopProgress();
  }

  async onUpdateStory$$() {
    const story = this.story;
    story.modifyTime = story.viewTime = Date.now();
    this.gv.appComp.startProgress("請稍後", "處理中");
    await this.storyService.upsertAStoryAsync(story);
    this.gv.appComp.stopProgress();
  }

  async canGetCurrentTime$$() {
    const self = this;
    setTimeout(() => { // Run after await
      self.requestMediaReady$.next();
    }, 0);
    return await self.responseMediaReady$.pipe(first()).toPromise();
  }

  inputFromFile(file: File|Blob) {
    const self = this;
    if (/(video|audio)/.test(file.type) === true) {
      self.initMe(file);
      this.gv.shownPage = PageType.MediaEdit;
    } else if (!!!file.type || /(text|json)/.test(file.type)) {
      const action$$ = new Promise( (res , rej) => {
        const reader = new FileReader();
        reader.onloadend = (e) => {
          let text = '';
          let story: IStory;
          try {
            text = (e.srcElement as any).result;
            story = self.storyService.getAStoryFromString(text);
            if (!!story) {
              res(story);
            } else {
              rej(story);
            }
          } catch (error) {
            rej(error);
          }
        };
        reader.onerror = rej;
        reader.readAsText(file);
      });
      action$$.then( (story: IStory) => {
          story.modifyTime = 0;
          self.initMe(story);
          this.gv.shownPage = PageType.MediaEdit;
        })
        .catch( err => {
          console.log(err);
          self.msgService.alert(((!!self.pts) ? self.pts.homePage.errWrongFormat : `輸入的json檔格式不合。錯誤訊息： `) + `${JSON.stringify(err)}`);
          return;
        });
    } else {
      self.msgService.alert((!!self.pts) ? self.pts.homePage.errFileType : '所選的檔案必須是影片、聲音檔，或者要匯入的json檔。');
      return;
    }
    // * [2018-07-19 21:28] Tell navbar that you want to create a story
    self.sideClickType = SideClickType.new;
  }

  async inputFromString$ (result: string)  {
    const self = this;
    let story: IStory;
    if (!!result === false) {
      return;
    }
    const ismdp = StringHelper.isMDP(result);
    result = StringHelper.refineLinkOfDGO(result);
    // * [2018-12-24 20:34] Check whether it is an MDP file
    let res = null;
    try {
      if (ismdp) {
        res = await self.http.get(result, {responseType: 'text'}).toPromise();
      }
    } catch (err) {
      console.log(err);
    }
    if (!!(story = self.storyService.getAStoryFromString(result)) ||
      !!(story = self.storyService.getAStoryFromString(res))) {
    // * [2018-10-09 10:18] For iOS, the user might want to copy Json's file's info to load a Json file
      story.modifyTime = 0;
      self.initMe(story);
    } else {
      // For url
      self.initMe(result);
    }
    self.gv.shownPage = PageType.MediaEdit;
    // * [2018-07-19 21:28] Tell navbar that you want to create a story
    self.sideClickType = SideClickType.new;
  }

  onActivatedHandler(ev: any) {
    const self = this;
    if (!!window['Windows']) {
      if (!!ev['blob']) { // For a file
        self.inputFromFile(<File>ev.blob);
      } else { // For Uri,
        const args = <Windows.ApplicationModel.Activation.IActivatedEventArgs>ev.detail[0];
        if (args.kind === Windows.ApplicationModel.Activation.ActivationKind.protocol) {
        const uri = (<Windows.ApplicationModel.Activation.ProtocolActivatedEventArgs>args).uri;
        console.log(`input uri = ${uri}`);
        const data = StringHelper.getInfoFromProtocolString(uri.displayUri);
        if (data.action === ProtocolActionType.mdplink) {
          self.inputFromString$(data.data);
        }
      }}
    } else if (!!!self.device.isCordova) {
      const uri = ev as string;
      const data = StringHelper.getInfoFromProtocolString(uri);
      if (data.action === ProtocolActionType.mdplink) {
        self.inputFromString$(data.data);
      }
    }
  }
}

export enum playerAction {
  none,
  play,
  pause,
  seek,
  getDuration,
  getVolume,
  setVolume,
  getPlaybackRate,
  setPlaybackRate,
  getAllowedPlaybackRate
}

export enum MEState {
  initialized,
  parsing,
  parseFailed,
  readyForPlayer,
  canPlay,
  error,
  waiting,
  playing,
  paused,
  stopped,
  disposed,
  playerReady
}

export enum SideClickType {
  none,
  new,
  select
}
