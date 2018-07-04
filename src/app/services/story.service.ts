import { Injectable } from '@angular/core';
import { playerType } from './media-edit.service';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  name: string;
  title: string;

  urlOrID: string;
  meType = playerType.none;

  frames: AFrame[];

  constructor() { }
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
