import { Injectable } from '@angular/core';
import { AppComponent } from '../../app.component';
import { timer } from 'rxjs';

export interface IExportSettings {
  zoomAll: number;
  export2FolderId: string;
}
@Injectable({
  providedIn: "root",
})
export class GvService {
  shownPage = PageType.Home;
  prevPage: PageType = PageType.Home;
  sharedFolderName = "SegmentedMediaLayer";
  ptVersion = "2021.0518.1";

  showSideNav = true;

  //#region LocalStorage: zoomAll
  private _zoomAll = 1;
  public get zoomAll(): number {
    return this._zoomAll;
  }
  public set zoomAll(v: number) {
    const percent = (1 / v) * 100;
    document.body.setAttribute(
      "style",
      `width: ${percent}%; height: ${percent}%; transform: scale(${v})`
    );
    this._zoomAll = v;
  }
  //#endregion LocalStorage: zoomAll

  //#region LocalStorage: googleUsers
  googleUsers: Array<{
    name: string;
    id: string;
    allowSet: "Yes" | "No" | "ask";
    setFId: string;
  }> = [];
  //#endregion LocalStorage: googleUsers

  isJustPointerEvents = false;

  checkPerDay: number;

  appComp: AppComponent;
  constructor() {
    const self = this;
    timer(0, 40000000).subscribe((_) => {
      self.checkPerDay = Date.now();
    });
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
      case ParaInLS.googleUsers:
        value = JSON.stringify(self.googleUsers);
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
        self.zoomAll = !!buf ? +buf : 1;
        value = self.zoomAll;
        break;
      case ParaInLS.googleUsers:
        self.googleUsers = !!buf ? JSON.parse(buf) : [];
        value = self.googleUsers;
        break;
      default:
        break;
    }
    return value;
  }
}

export enum ParaInLS {
  zoomAll,
  googleUsers,
}

export enum PageType {
  Home,
  MediaEdit,
  AppSetting,
  Test
}
