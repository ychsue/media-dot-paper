import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaEditService {

  onStateChanged: Subject<MEState>;
  onPlayerAction: Subject<playerAction>;
  pType: playerType;

  private _state: MEState;
  public get state(): MEState {
    return this._state;
  }
  public set state(v: MEState) {
    if (this._state !== v && !!this.onStateChanged) {
      this.onStateChanged.next(v);
    }
    this._state = v;
  }

  title = '';
  urlOrId = '';
  blob: Blob;
  currentTime = 0;
  constructor() {
    this.onStateChanged  = new Subject<MEState>();
    this.onPlayerAction = new Subject<playerAction>();
    this.state = MEState.initialized;
  }

  initMe(data: Blob|string, pType: playerType = playerType.auto) {
    this.state = MEState.parsing;
    // * [2018-06-20 11:00] Check the type of service is
    if (pType !== playerType.auto) {
      this.pType = pType;
    } else {
      if ((typeof data) === 'string') {
        this.pType = playerType.url;
      } else if (!!(data as Blob)) {
        this.pType = playerType.file;
      } else {
        this.state = MEState.parseFailed;
        return;
      }
    }

    if ((this.pType === playerType.url) || (this.pType === playerType.youtubeID)) {
      this.urlOrId = data as string;
      this.title = this.urlOrId;
    } else if (this.pType === playerType.file) {
      this.blob = data as Blob;
      this.urlOrId = window.URL.createObjectURL(this.blob);
      if (!!(data as File)) {
        this.title = (data as File).name;
      }
    }
    this.state = MEState.readyForPlayer;
  }
}

export enum playerAction {
  none,
  play,
  pause,
  seek
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

export enum playerType {
  none,
  auto,
  file,
  url,
  youtubeID
}
