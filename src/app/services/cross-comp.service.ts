import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { first } from 'rxjs/operators';
import { protocolCheck } from "../../extra-scripts/protocolCheck";

@Injectable({
  providedIn: 'root'
})
export class CrossCompService {

  listOfStoredEle: HTMLElement; // list of home.component for draglist
  listOfMDP: HTMLElement;

  videoEle: HTMLVideoElement;
  mediaEle: HTMLVideoElement | HTMLAudioElement;
  isVideoEle = false;

  constructor() { }

  clickVideoLoad_justIOS(callback: Function, ...args) {
    const self = this;

    const isIOS = (!!window['cordova'] && (cordova.platformId === 'ios')) ||
      protocolCheck?.checkBrowser().isSafari;

    if (isIOS &&
      !!self.videoEle &&
      self.isVideoEle &&
      (self.mediaEle.readyState < 2)
    ) {
      self.videoEle.load();
      fromEvent(self.videoEle, 'canplay').pipe(first()).subscribe(_ => {
        callback(...args);
      });
    }
  }
}
