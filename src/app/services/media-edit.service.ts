import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { StoryService } from "./story.service";
import { PlayerType } from "../vm/player-type.enum";
import { AdService } from "./ad.service";
import { DbService } from "./db.service";
import { FsService } from "./fs.service";
import { MessageService, MessageTypes } from "./message.service";
import { concatAll, map, shareReplay, concat, first } from "rxjs/operators";
import { PageTextsService } from "./page-texts.service";
import { Story, IStory } from "../vm/story";
import { StoryGSetting } from "../vm/story-g-setting";
import {
  SSutterParameters,
  SpeechSynthesisService,
} from "./speech-synthesis.service";
import { GvService, PageType } from "./GV/gv.service";
import { DeviceService } from "./device.service";
import { StringHelper, ProtocolActionType } from "../extends/string-helper";
import { HttpClient } from "@angular/common/http";
import { GapiService } from "./GAPI/gapi.service";
import { ZipService } from "./ZIP/zip.service";
import w3cBlob2TxtAsync from "../extends/w3cBlob2TxtAsync";
import { IW3CFileWithMetadata, IWinCacheMetaData } from "./FS/_FS.declare";

@Injectable({
  providedIn: "root",
})
export class MediaEditService {
  _onStateChanged: Subject<MEState>; // Just for subscribe, if you want to trigger it, set ~self.state~.
  public get onStateChanged(): Observable<MEState> {
    return this._onStateChanged;
  }

  requestMediaReady$ = new Subject<null>(); // Subscribed by player
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
    return !!this._duration && this._duration !== Infinity
      ? this._duration
      : 100;
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
  links: Array<string> = [];

  isAlwaysShowMask = false; // [2019-11-07] Used to control whether it should always show the mask, such as subtitles.

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
  public set isSideMani(v: boolean) {
    // Force it to be false when isToShowList is false
    this._isSideMani = v && this.isToShowList;
  }

  isToShowStoryGSetting = false;

  isHideMeSectionDashboard = false;

  pts: IPageTexts;

  constructor(
    private adService: AdService,
    private fsService: FsService,
    private msgService: MessageService,
    private db: DbService,
    private ptsService: PageTextsService,
    private storyService: StoryService,
    private SSService: SpeechSynthesisService,
    private gv: GvService,
    private device: DeviceService,
    private http: HttpClient,
    private GAPIService: GapiService,
    private zipService: ZipService,
  ) {
    const self = this;
    self.ptsService.PTSReady$.subscribe((_) => {
      self.pts = self.ptsService.pts;
      self.story = new Story(self.pts);
    });
    self.ptsService.ptsLoaded$.subscribe((_) => {
      self.pts = self.ptsService.pts;
    });
    this._onStateChanged = new Subject<MEState>();
    this.onPlayerAction = new Subject<playerAction>();
    this.state = MEState.initialized;
    // * [2018-08-25 21:26] light up setiFrame$
    this.setiFrame$.subscribe();
    // * [2019-02-17 18:17] handle onactivated event
    self.device.onMyActivated$.subscribe(self.onActivatedHandler.bind(self));
    // * [2019-03-29 17:15] Pause the media explicitly when the user switch to other Apps.
    if (self.device.isCordova) {
      self.device.channel.onPause.subscribe((_) => {
        this.onPlayerAction.next(playerAction.pause);
      });
    }
  }

  initMe(data: Blob | IStory | string, pType: PlayerType = PlayerType.auto) {
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
      if (typeof data === "string") {
        this.story = new Story(this.pts);
        this.lastTimeCallInitMeFromUrl = this.story.makeTime;
        this.story.meType = PlayerType.url;
      } else if (!!data["makeTime"]) {
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

    if (!!data["makeTime"]) {
      // * [2018-07-19 13:41] If input is a story
    } else if (
      this.story.meType === PlayerType.url ||
      this.story.meType === PlayerType.youtubeID
    ) {
      this.story.urlOrID = data as string;
      this.story.title = this.story.urlOrID;
      this.story.name = this.story.title.slice(
        this.story.title.lastIndexOf("/") + 1
      );
    } else if (this.story.meType === PlayerType.file) {
      this.blob = data as Blob;
      const metaData: IWinCacheMetaData = this.device.isWinRT
        ? (data as any as IW3CFileWithMetadata).WinMetaData
        : {
            token: window.URL.createObjectURL(this.blob),
            path: (this.blob as File)?.name,
            type: this.blob.type,
          };
      this.story.urlOrID = JSON.stringify(metaData);

      if (!!(data as File)?.name) {
        this.story.title = this.story.fileName = (data as File).name;
        this.story.name = this.story.title;
      }
    }

    // * [2018-10-17 10:31] Since we have anewed the story, force it to set its gSetting
    if (!!this.story.gSetting === false) {
      this.story.gSetting = new StoryGSetting();
    }
    this.story.gSetting.utterPara = this.SSService.updateUtterParaWithVoice(
      this.story.gSetting.utterPara
    );

    this.updateLinks();

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
      i = Number.isNaN(i) ? self.story.iFrame : i;
      const setFromDefault = () => {
        self._volume = !!self.story.gSetting ? self.story.gSetting.volume : 1;
      };
      if (i >= 0) {
        // if it is a frame.
        const frame = self.story.frames[i];
        if (!!frame.useDefVP) {
          setFromDefault();
        } else {
          self._volume = frame.volume;
        }
      } else {
        // for all
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
      i = Number.isNaN(i) ? self.story.iFrame : i;
      const setFromDefault = () => {
        self._playbackRate = !!self.story.gSetting
          ? self.story.gSetting.rate
          : 1;
      };
      if (i >= 0) {
        // if it is a frame.
        const frame = self.story.frames[i];
        if (!!frame.useDefVP) {
          setFromDefault();
        } else {
          self._playbackRate = frame.rate;
        }
      } else {
        // for whole story
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
      if (i >= 0) {
        // if it is a frame.
        const frame = self.story.frames[i];
        frame.volume = self._volume;
      } else {
        // for all
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
      if (i >= 0) {
        // if it is a frame.
        const frame = self.story.frames[i];
        frame.rate = self._playbackRate;
      } else {
        // for whole story
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
      const isSaved = await this.fsService
        .getFile$(story.fileName, true)
        .pipe(
          map((fEntry) => {
            return self.fsService.writeFile$(fEntry, self.blob);
          }),
          concatAll()
        )
        .toPromise();
      // * [2018-08-05 17:23] if it is saved, renew its URL
      if (isSaved === true) {
        story.urlOrID = (
          await this.fsService.getFile$(story.fileName).toPromise()
        ).toURL();
      }

      self.msgService.pushMessage({
        type: MessageTypes.Info,
        message: `The file ${story.fileName} is stored: ${isSaved}`,
      });
    }
    delete story["id"];
    const insert = await this.storyService.upsertAStoryAsync(story);
    // * [2018-07-25 19:04] Change its state to 'Update'
    story["id"] = insert[0].affectedRows[0].id;
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
    setTimeout(() => {
      // Run after await
      self.requestMediaReady$.next();
    }, 0);
    return await self.responseMediaReady$.pipe(first()).toPromise();
  }

  async inputFromFile(file: File | Blob) {
    const self = this;
    if (/(video|audio)/.test(file.type) === true) {
      self.initMe(file);
      this.gv.shownPage = PageType.MediaEdit;
    } else if (/zip/i.test(file.type) || /zip$/i.test(file["name"])) {
      const zip = await this.zipService.service.importFromZipAsync({
        data: file,
      });
      const data = JSON.parse(await w3cBlob2TxtAsync(zip[0].blob)) as IStory;
      data.modifyTime = 0;
      self.initMe(data);
      this.gv.shownPage = PageType.MediaEdit;
    } else if (!!!file.type || /(text|json|mdpyc)/.test(file.type)) {
      w3cBlob2TxtAsync
        .bind(w3cBlob2TxtAsync)(file)
        .then((txt) => self.storyService.getAStoryFromString(txt))
        .then((story: IStory) => {
          story.modifyTime = 0;
          self.initMe(story);
          this.gv.shownPage = PageType.MediaEdit;
        })
        .catch((err) => {
          console.log(err);
          self.msgService.alert(
            (!!self.pts && !!self.pts.homePage
              ? self.pts.homePage.errWrongFormat
              : `輸入的json檔格式不合。錯誤訊息： `) + `${JSON.stringify(err)}`
          );
          return;
        });
    } else {
      self.msgService.alert(
        !!self.pts && !!self.pts.homePage
          ? self.pts.homePage.errFileType
          : "所選的檔案必須是影片、聲音檔，或者要匯入的json檔。"
      );
      return;
    }
    // * [2018-07-19 21:28] Tell navbar that you want to create a story
    self.sideClickType = SideClickType.new;
  }

  async inputFromString$(result: string) {
    const self = this;
    let story: IStory;
    let res = null;
    if (!!result === false) {
      return;
    }
    // * [2019-03-10 07:03] Because 'http(s):~' or 'http(s):/~' will crash windows uwp,
    //                        I need to do something to prevent this kind of behavior.
    result = StringHelper.correctHttpURL(result);

    //* [2021-04-08 11:10] Dealing with MDPYC stored in Google Drive
    try {
      const getFromGoogle = await self.GAPIService.getGoogleDriveDataFromFileIdAsync(
        self.GAPIService.service.getFileIdFromUri(result), 'story'
      );
      if (
        !!getFromGoogle &&
        !!getFromGoogle["mimeType"] &&
        /(video|audio)/i.test(getFromGoogle["mimeType"] as string)
      ) {
        self.msgService.alert(
          !!self.pts.mediaEditService.suggestionMedia
            ? self.pts.mediaEditService.suggestionMedia
            : `This google drive's file is a media. Remember to share this file before you want others can play it.`
        ); //I18N
      } else {
        story = getFromGoogle as Story;
      }
    } catch (error) {
      self.msgService.alert(
        `media-edit.service::inputFromString$ ERROR: ${(error as Error).message
        }`
      );
    }

    if (!!!story) {
      const ismdp = StringHelper.isMDP(result);
      result = StringHelper.refineLinkOfDGO(result);
      // * [2018-12-24 20:34] Check whether it is an MDP file
      try {
        if (ismdp) {
          res = await self.http
            .get(result, { responseType: "text" })
            .toPromise();
        }
      } catch (err) {
        const cP = window["protocolCheck"].checkBrowser(); // checkPlatform
        if (!!!window.cordova) {
          self.gv.showSideNav = true;
          const isNone = !cP.isWindows && !cP.isMac && !cP.isIOS;
          const msg =
            (!!self.pts && !!self.pts.mediaEditService
              ? self.pts.mediaEditService.CORerror
              : `抱歉，所附連結方因為安全關係，不讓別的網頁直接載入該檔，請
        <ol>
        <li><a href='{0}'>下載此檔</a></li>
        <li>由此網頁左側欄裡的'文件'按鈕匯入此檔即可</li>
        </ol>
        另一種更為簡便的方法是安裝本APP，下次就會轉而由本APP接手了。請由以下的商店取得。</br>
        `
            ).replace("{0}", result) +
            (isNone
              ? `
        <a mat-button href="https://play.google.com/store/apps/details?id=tw.at.yescirculation.mediadotpaper">
        <img alt="Get it on Google Play"
             src="https://developer.android.com/images/brand/en_generic_rgb_wo_45.png" />
    </a>`
              : "") +
            (isNone || cP.isWindows
              ? `
    <a mat-button href='//www.microsoft.com/store/apps/9PP2LJRFF179?ocid=badge'>
        <img style="height:45px"
         src='https://assets.windowsphone.com/85864462-9c82-451e-9355-a3d5f874397a/English_get-it-from-MS_InvariantCulture_Default.png'
         alt='English badge'/>
    </a>`
              : "") +
            (isNone || (cP.isMac && !cP.isIOS)
              ? // tslint:disable-next-line:max-line-length
              `<a style="display:inline-block;overflow:hidden;background:url(https://linkmaker.itunes.apple.com/en-us/badge-lrg.svg?releaseDate=2018-10-31T00:00:00Z&kind=desktopapp&bubble=macos_apps) no-repeat;width:165px;height:40px;padding: 0 42px;background-position: center;" href="https://geo.itunes.apple.com/us/app/media-dot-paper/id1436714053?mt=12&app=apps"></a>`
              : "") +
            (isNone || cP.isIOS
              ? // tslint:disable-next-line:max-line-length
              `<a style="display:inline-block;overflow:hidden;background:url(https://linkmaker.itunes.apple.com/en-us/badge-lrg.svg?releaseDate=2018-10-27&kind=iossoftware&bubble=ios_apps) no-repeat;width:135px;height:40px;padding: 0 0 0 12px;background-position: center;" href="https://itunes.apple.com/us/app/media-dot-paper/id1436677583?mt=8"></a>`
              : "");
          self.msgService.alert(msg, false);
          return;
        } else {
          console.log(err);
        }
      }
    }
    if (
      !!story ||
      !!(story = self.storyService.getAStoryFromString(result)) ||
      !!(story = self.storyService.getAStoryFromString(res))
    ) {
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
    if (ev.type !== "activated") {
      self.gv.showSideNav = false;
    }
    if (ev.type === "file") {
      // For a file
      self.inputFromFile(<File>ev.data);
    } else if (ev.type === "uri") {
      // For Uri,
      const uri = !!window["Windows"] ? ev.data.displayUri : ev.data;
      const data = StringHelper.getInfoFromURIString(uri);
      if (data.action === ProtocolActionType.mdplink) {
        self.inputFromString$(data.data);
      } else {
        // it might be text
        self.inputFromString$(uri);
      }
    }
  }

  updateLinks() {
    const self = this;
    const oLinks = self.story.gSetting.links;
    self.links = Object.assign([], oLinks);
    // * [2019-03-28] Get links from descriptions
    const arrDesc = !!self.story.description
      ? self.story.description.split(/[\r\n\s]+/i)
      : [];
    arrDesc.forEach((ele) => {
      if (!!ele.match(/^https?\:\/\//i)) {
        self.links.push(ele);
      }
    });
    // * [2019-03-28 15:57] Force the media's link as one link
    const storyURL = self.story.urlOrID;
    if (!!storyURL.match(/^https\:\/\/(www\.youtube\.com|youtu\.be)\//i)) {
      self.links.unshift(storyURL);
    } else if (self.story.meType === PlayerType.url) {
      self.links.push(storyURL);
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
  getAllowedPlaybackRate,
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
  playerReady,
}

export enum SideClickType {
  none,
  new,
  select,
}
