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

  public duration = 0;

  story = new Story();
  blob: Blob;

  currentTime = 0;
  iFrame = -1;

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

    // * [2018-07-23 10:16] Update the duration
    if (this.story.meType !== PlayerType.youtubeID) {
      this.onPlayerAction.next(playerAction.getDuration);
    }
    this.state = MEState.readyForPlayer;
  }
}

export enum playerAction {
  none,
  play,
  pause,
  seek,
  getDuration
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
