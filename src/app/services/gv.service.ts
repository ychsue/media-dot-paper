import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GvService {

  shownPage = PageType.Home;
  sharedFolderName = 'SegmentedMediaLayer';
  ptVersion = "2018.1002.1";

  isJustPointerEvents = false;
  constructor() { }
}

export enum PageType {
  Home,
  MediaEdit,
  Test
}
