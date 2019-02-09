import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GvService {

  shownPage = PageType.Home;
  sharedFolderName = 'SegmentedMediaLayer';
  ptVersion = "2019.207.3";

  zoomAll = 1;
  private _zoomAllKey = "zoomAll";

  isJustPointerEvents = false;

  checkPerDay: number;

  appComp: AppComponent;
  constructor() {
    const self = this;
    timer(0, 40000000).subscribe(_ => {self.checkPerDay = Date.now(); });
    self.loadFromLocalStorage(ParaInLS.zoomAll);
  }

  saveToLocalStorage(type: ParaInLS) {
    const self = this;
    switch (type) {
      case ParaInLS.zoomAll:
        localStorage.setItem(self._zoomAllKey, self.zoomAll.toString());
        break;
      default:
        break;
    }
  }

  loadFromLocalStorage(type: ParaInLS) {
    const self = this;
    switch (type) {
      case ParaInLS.zoomAll:
        const buf = localStorage.getItem(self._zoomAllKey);
        self.zoomAll = (!!buf) ? +buf : 1;
        break;
      default:
        break;
    }
  }
}

export enum ParaInLS {
  zoomAll
}

export enum PageType {
  Home,
  MediaEdit,
  AppSetting,
  Test
}
