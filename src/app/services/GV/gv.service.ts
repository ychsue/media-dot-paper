import { Injectable } from '@angular/core';
import { AppComponent } from '../../app.component';
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

  //#region LocalStorage: zoomAll 
  private _zoomAll = 1;
  public get zoomAll(): number {
    return this._zoomAll;
  }
  public set zoomAll(v: number) {
    const percent = 1 / v * 100;
    document.body.setAttribute('style', `width: ${percent}%; height: ${percent}%; transform: scale(${v})`);
    this._zoomAll = v;
  }
  //#endregion LocalStorage: zoomAll 

  //#region localStorage: export2FolderId
  export2FolderId: string = "";
  //#endregion localStorage: export2FolderId

  //#region LocalStorage: isFirstTime
  isFirstTime: boolean = true;
  //#endregion LocalStorage: isFirstTime

  isJustPointerEvents = false;

  checkPerDay: number;

  appComp: AppComponent;
  constructor() {
    const self = this;
    timer(0, 40000000).subscribe(_ => { self.checkPerDay = Date.now(); });
    for (let para in ParaInLS) {
      if (!!Number(para)) continue; // In its js transcription code, ParaInLS[i0] will be the name of key[i0]. We don't need it
      self.loadFromLocalStorage((ParaInLS as Object)[para]);
    }
  }

  saveToLocalStorage(type: ParaInLS) {
    const self = this;
    const key = ParaInLS[type];
    var value: string;
    switch (type) {
      case ParaInLS.zoomAll:
        value = self.zoomAll.toString();
        break;
      case ParaInLS.export2FolderId:
        value = self.export2FolderId;
        break;
      case ParaInLS.isFirstTime:
        value = self.isFirstTime.toString();
        break;
      default:
        break;
    }

    localStorage.setItem(key, value);
  }

  loadFromLocalStorage(type: ParaInLS) {
    const self = this;
    const buf = localStorage.getItem(ParaInLS[type]);
    let value: any;
    switch (type) {
      case ParaInLS.zoomAll:
        self.zoomAll = (!!buf) ? +buf : 1;
        value = self.zoomAll;
        break;
      case ParaInLS.export2FolderId:
        self.export2FolderId = buf;
        value = self.export2FolderId;
        break;
      case ParaInLS.isFirstTime:
        self.isFirstTime = (typeof buf === 'string') ? JSON.parse(buf) : true;
        value = self.isFirstTime;
        break;
      default:
        break;
    }
    return value;
  }
}

export enum ParaInLS {
  zoomAll,
  export2FolderId,
  isFirstTime,
}

export enum PageType {
  Home,
  MediaEdit,
  AppSetting,
  Test
}
