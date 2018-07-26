import { Injectable } from '@angular/core';
import { PlayerType } from '../vm/player-type.enum';
import { AFrame } from '../vm/a-frame';

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

  urlOrID = 'https://youtu.be/rpvsEBdP4c8';
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
