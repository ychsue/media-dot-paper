import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GvService {

  shownPage = PageType.Home;
  sharedFolderName = 'SegmentedMediaLayer';
  ptVersion = "2018.1226.2";

  isJustPointerEvents = false;

  checkPerDay: number;

  appComp: AppComponent;
  constructor() {
    const self = this;
    timer(0, 40000000).subscribe(_ => {self.checkPerDay = Date.now(); });
  }
}

export enum PageType {
  Home,
  MediaEdit,
  AppSetting,
  Test
}
