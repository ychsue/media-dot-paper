import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GvService {

  shownPage = PageType.Home;
  prevPage: PageType = PageType.Home;
  sharedFolderName = 'SegmentedMediaLayer';
  ptVersion = "2019.1100.3";

  showSideNav = true;

  private _zoomAll = 1;
  public get zoomAll(): number {
    return this._zoomAll;
  }
  public set zoomAll(v: number) {
    const percent = 1 / v * 100;
    document.body.setAttribute('style', `width: ${percent}%; height: ${percent}%; transform: scale(${v})`);
    this._zoomAll = v;
  }

  private _zoomAllKey = "zoomAll";

  isJustPointerEvents = false;

  checkPerDay: number;

  appComp: AppComponent;
  constructor() {
    const self = this;
    timer(0, 40000000).subscribe(_ => { self.checkPerDay = Date.now(); });
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
