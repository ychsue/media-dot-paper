import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrossCompService {

  listOfStoredEle: HTMLElement; // list of home.component for draglist
  listOfMDP: HTMLElement;

  videoEle: HTMLVideoElement;
  isVideoEle = false;

  constructor() { }

  clickVideoLoad_justIOS(callback: Function, ...args) {
    const self = this;
    if (!!window['cordova'] && (cordova.platformId === 'ios') &&
      !!self.videoEle && self.isVideoEle && (self.videoEle.readyState < 2 )
    ) {
      self.videoEle.load();
      fromEvent(self.videoEle, 'canplay').pipe(first()).subscribe(_ => {
        callback(...args);
      });
    }
  }
}
