import { Injectable } from '@angular/core';
import { PlayerType } from '../vm/player-type.enum';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor() { }
}

export class Story implements IStory {
  name = '請給個名字';
  title = '歡迎使用本App來幫助學習';

  makeTime: number;
  modifyTime: number;
  viewTime: number;

  urlOrID = 'https://youtu.be/f1SZ5GaAp3g';
  meType = PlayerType.url;

  frames: AFrame[];

  constructor() {
    const time = Date.now();
    this.makeTime = this.modifyTime = this.viewTime = time;
    this.frames = [];
    return this;
  }
}
export interface IStory {
  id?: string;
  name: string;
  title: string;

  makeTime: number;
  modifyTime: number;
  viewTime: number;

  urlOrID: string;
  meType: PlayerType;

  frames: AFrame[];
}

export class AFrame {
  name: string;
  pseudopath = '/';

  genTime: number;
  colorR: number;
  colorG: number;
  colorB: number;
  top = 0.5; // 0 ~ ${1-height}
  height = 0.3;

  start = 0;
  end = 0;

  rate = 1;

  subtitle = '';
}
