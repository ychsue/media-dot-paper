import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { IStory, Story } from './story.service';
import { PlayerType } from '../vm/player-type.enum';

@Injectable({
  providedIn: 'root'
})
export class MediaEditService {

  _onStateChanged: Subject<MEState>; // Just for subscribe, if you want to trigger it, set ~self.state~.
  public get onStateChanged(): Observable<MEState> {
    return this._onStateChanged;
  }

  onPlayerAction: Subject<playerAction>;

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

  constructor() {
    this._onStateChanged  = new Subject<MEState>();
    this.onPlayerAction = new Subject<playerAction>();
    this.state = MEState.initialized;
  }

  initMe(data: Blob| IStory| string, pType: PlayerType = PlayerType.auto) {
    // * [2018-07-19 17:58] pause previous action
    this.onPlayerAction.next(playerAction.pause);
    // * [2018-07-19 17:59] Start to initialize it.
    this.state = MEState.parsing;
    // * [2018-06-20 11:00] Check the type of service is
    if (pType !== PlayerType.auto) {
      this.story.meType = pType;
    } else {
      if ((typeof data) === 'string') {
        this.story = new Story();
        this.story.meType = PlayerType.url;
      } else if (!!data['viewTime']) {
        this.story = data as IStory;
      } else if (!!(data as Blob)) {
        this.story = new Story();
        this.story.meType = PlayerType.file;
      } else {
        this.state = MEState.parseFailed;
        return;
      }
    }

    if (!!data['viewTime']) {
      // * [2018-07-19 13:41] If input is a story
    } else if ((this.story.meType === PlayerType.url) || (this.story.meType === PlayerType.youtubeID)) {
      this.story.urlOrID = data as string;
      this.story.title = this.story.urlOrID;
    } else if (this.story.meType === PlayerType.file) {
      this.blob = data as Blob;
      this.story.urlOrID = window.URL.createObjectURL(this.blob);
      if (!!(data as File)) {
        this.story.title = (data as File).name;
      }
    }

    // * [2018-07-23 10:16] Update the duration & playbackRates
    if (this.story.meType !== PlayerType.youtubeID) {
      this.onPlayerAction.next(playerAction.getDuration);
      this.onPlayerAction.next(playerAction.getAllowedPlaybackRate);
    }
    this.state = MEState.readyForPlayer;
  }

  setiFrame(i: number) {
    const self = this;
    if (!!self.story) {
      // **************************** TODO ********************************************
      self.story.iFrame = i;
      self.setVolumeFromFrame();
      self.setPlaybackRateFromFrame();
    } else {
      console.log(`Problem in setiFrame(${i})`);
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
      console.log(`Problem in setVolume`);
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
      console.log(`Problem in setPlaybackRate`);
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
      console.log(`Problem in setVolume`);
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
      console.log(`Problem in setPlaybackRate`);
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
  disposed
}

export enum SideClickType {
  none,
  new,
  select
}
