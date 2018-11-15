import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class GvService {

  shownPage = PageType.Home;
  sharedFolderName = 'SegmentedMediaLayer';
  ptVersion = "2018.1115.2";

  isJustPointerEvents = false;

  appComp: AppComponent;
  constructor() { }
}

export enum PageType {
  Home,
  MediaEdit,
  Test
}
