import { Injectable } from '@angular/core';
import { PlayerType } from '../vm/player-type.enum';
import { AFrame } from '../vm/a-frame';
import { PageTextsService } from './page-texts.service';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor() { }
}

export class Story implements IStory {
  name = '請給個名字';
  title = '歡迎使用本App來幫助學習';
  description = '';
  keywords = '';

  makeTime: number;
  modifyTime: number;
  viewTime: number;

  urlOrID = ''; // 'https://youtu.be/rpvsEBdP4c8';
  meType = PlayerType.url;

  fileName = '';
  fileToken = '';

  frames: AFrame[];
  iFrame = -1;

  utterType = utterType.none;

  constructor(pts?: IPageTexts) {
    if (!!pts === true) {
      this.name = pts.NewStory.name;
      this.title = pts.NewStory.title;
    }
    const time = Date.now();
    this.makeTime = this.viewTime = time;
    this.modifyTime = 0;
    this.frames = [];
    return this;
  }
}
export interface IStory {
  id?: string;
  name: string;
  title: string;
  description: string;
  keywords: string;

  makeTime: number;
  modifyTime: number;
  viewTime: number;

  urlOrID: string;
  meType: PlayerType;

  fileName: string;
  fileToken: string;

  frames: AFrame[];
  iFrame: number;

  utterType: utterType;
}

export enum utterType {
  none,
  byEach,
  all
}
