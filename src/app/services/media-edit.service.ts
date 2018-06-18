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
  url = '';
  blob: Blob;
  currentTime = 0;
  constructor() {
    this.onStateChanged  = new Subject<MEState>();
    this.onPlayerAction = new Subject<playerAction>();
    this.state = MEState.initialized;
  }

  initMe(data: Blob|string) {
    this.state = MEState.parsing;
    if ((typeof data) === 'string') {
      this.pType = playerType.url;
      this.title = data as string;
      this.url = this.title;
    } else if (!!(data as Blob)) {
      this.blob = data as Blob;
      this.pType = playerType.file;
      this.url = window.URL.createObjectURL(this.blob);
      if (!!(data as File)) {
        this.title = (data as File).name;
      }
    } else {
      this.state = MEState.parseFailed;
      return;
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
  file,
  url,
  youtube
}
