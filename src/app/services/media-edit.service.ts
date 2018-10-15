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
    return (!!this._duration) ? this._duration : 100;
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

  pts: IPageTexts;

  constructor(private adService: AdService,
              private fsService: FsService,
              private msgService: MessageService,
              private db: DbService,
              private ptsService: PageTextsService,
              private storyService: StoryService
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

  setVolumeFromFrame() {
    const self = this;
    if (!!self.story) {
      const i = self.story.iFrame;
      // **************************** TODO ********************************************
      if (i >= 0) { // if it is a frame.
        const frame = self.story.frames[i];
        self._volume = frame.volume;
      } else { // for all
        self._volume = 1;
      }
      self.onPlayerAction.next(playerAction.setVolume);
    } else {
      self.msgService.alert(`Problem in setVolume`);
    }
  }

  setPlaybackRateFromFrame() {
    const self = this;
    if (!!self.story) {
      const i = self.story.iFrame;
      // **************************** TODO ********************************************
      if (i >= 0) { // if it is a frame.
        const frame = self.story.frames[i];
        self._playbackRate = frame.rate;
      } else { // for whole story
        self._playbackRate = 1;
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
      // **************************** TODO ********************************************
      if (i >= 0) { // if it is a frame.
        const frame = self.story.frames[i];
        frame.volume = self._volume;
      } else { // for all
        // self._volume = 1;
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
      // **************************** TODO ********************************************
      if (i >= 0) { // if it is a frame.
        const frame = self.story.frames[i];
        frame.rate = self._playbackRate;
      } else { // for whole story
        // self._playbackRate = 1;
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
  }

  async onUpdateStory$$() {
    const story = this.story;
    story.modifyTime = story.viewTime = Date.now();
    await this.storyService.upsertAStoryAsync(story);
  }

  async canGetCurrentTime$$() {
    const self = this;
    setTimeout(() => { // Run after await
      self.requestMediaReady$.next();
    }, 0);
    return await self.responseMediaReady$.pipe(first()).toPromise();
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
