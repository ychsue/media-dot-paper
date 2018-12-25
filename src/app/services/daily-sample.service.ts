import { Injectable } from '@angular/core';
import { DailySample } from '../vm/daily-sample';
import { StringHelper } from '../extends/string-helper';

@Injectable({
  providedIn: 'root'
})
export class DailySampleService {
  DSListKey = 'DSList';
  CurrentDSKey = 'CurrentDSKey';

  defaultDS1: DailySample = {name: '每日一例',
    URL: 'https://memorizeyc.azurewebsites.net/static/mediadotpaper/assets/DailySample.txt',
    createTime: 1
  };

  private _currentDS: DailySample;
  public get currentDS(): DailySample {
    const self = this;
    if (!!self._currentDS === false) {
      const cTime = +localStorage.getItem(self.CurrentDSKey);
      if (!!cTime) {
        this.currentDS = [self.defaultDS1, ...self.listOfDS].find(x => x.createTime === cTime);
      }

      if ((!!self._currentDS && !!cTime) === false) {
        this.currentDS = this.defaultDS1;
      }
    }
    return this._currentDS;
  }
  public set currentDS(v: DailySample) {
    const self = this;
    this._currentDS = v;
    localStorage.setItem(self.CurrentDSKey, v.createTime.toString());
  }

  listOfDS: Array<DailySample>;
  constructor() {
    this._loadList();
  }

  private _storeList() {
    localStorage.setItem(this.DSListKey, JSON.stringify(this.listOfDS));
  }

  private _loadList() {
    const stDSList = localStorage.getItem(this.DSListKey);
    this.listOfDS = (!!stDSList) ? JSON.parse(stDSList) : [];
  }

  delete(ds: DailySample) {
    const ind = this.listOfDS.findIndex(x => x.createTime === ds.createTime);
    if (ind !== -1) {
      if (this.listOfDS[ind].createTime === this.currentDS.createTime) {
        this.currentDS = this.defaultDS1;
      }
      this.listOfDS.splice(ind, 1);
      this._storeList();
    }
  }

  edit(ds: DailySample) {
    ds.URL = StringHelper.refineLinkOfDGO(ds.URL);
    const ind = this.listOfDS.findIndex(x => x.createTime === ds.createTime);
    if (ind !== -1) {
      this.listOfDS[ind] = ds;
      if (this.currentDS.createTime === ds.createTime) {
        this.currentDS = ds;
      }
      this._storeList();
    }
  }

  add(ds: DailySample) {
    ds.URL = StringHelper.refineLinkOfDGO(ds.URL);
    this.listOfDS.push(ds);
    this._storeList();
  }
}
