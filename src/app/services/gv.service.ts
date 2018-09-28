import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GvService {

  shownPage = PageType.Home;
  sharedFolderName = 'SegmentedMediaLayer';
  ptVersion = "2018.928.1";

  constructor() { }
}

export enum PageType {
  Home,
  MediaEdit,
  Test
}
