import { Injectable } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { take, last, share, shareReplay, first } from "rxjs/operators";
import { DeviceService } from './device.service';

// Gotten from https://github.com/floatinghotpot/cordova-admob-pro

@Injectable({
  providedIn: 'root'
})
export class AdService {
  admobid: {
    banner: string,
    interstitial: string,
    rewardvideo: string
  };
  adWin: {
    AppId: string,
    AdUnitId: string
  };

  _adReady$ = new Subject<boolean>();
  // public get adReady$(): Observable<boolean> {
  //   return this._adReady$.pipe(first());
  // }

  adReady$ = this._adReady$.pipe(shareReplay(1));

  msAdv: any;
  interstitial: any;

  constructor(private device: DeviceService) {
    const self = this;
    if (!!cordova) {
      if (cordova.platformId === 'windows') {
        self.iniWinSDK();
      } else {
        self.iniAdMob();
      }
      this.prepareInterstitial();
    }
  }

  prepareInterstitial() {
    const self = this;
    self.adReady$.subscribe(isReady => {
      if (isReady) {
        // * [2018-08-15 16:19] Initialize it
        if (!!window['MicrosoftNSJS']) {
          self.interstitial.requestAd(self.msAdv.InterstitialAdType.display, self.adWin.AppId, self.adWin.AdUnitId);
        } else if (!!window['AdMob']) {
          self.interstitial.prepareInterstitial(
            {adId: self.admobid.interstitial, autoShow: false}
          );
        }
      }
    });
  }

  showInterstitial() {
    const self = this;
    self.adReady$.subscribe(isReady => {
      if (isReady) {
        if (!!window['MicrosoftNSJS']) {
          self.interstitial.show();
        } else if (!!window['AdMob']) {
          self.interstitial.showInterstitial();
        }
        // * [2018-08-18 15:47] Renew it 2 min later
        setTimeout(() => {
          self.prepareInterstitial();
        }, 1000 * 60 * 2);
      }
    });
  }

  iniWinSDK() {
    const self = this;
    if (!!cordova && cordova.platformId === 'windows') {
      // * [2018-08-16 09:33] Load in the needed script
      const doc = window.document;
      const sdkScript = doc.createElement('script');
      sdkScript.type = 'text/javascript';
      sdkScript.src = '//Microsoft.Advertising.JavaScript/ad.js';
      doc.head.appendChild(sdkScript);
      // * [2018-08-16 09:35] Start to load
      // *********************** TODO **************************************
      let isReady = false;
      interval(100).pipe(take(10)).subscribe(i0 => {
        if (i0 >= 9 && isReady === false) {
          self._adReady$.next(false);
          self._adReady$.complete();
        } else if (isReady === false) {
          if (!!window['MicrosoftNSJS'] && !!window['MicrosoftNSJS']['Advertising']) {
            self.msAdv = window['MicrosoftNSJS']['Advertising'];
            self.interstitial = new self.msAdv.InterstitialAd();
            self.adWin = {
              AppId : "d25517cb-12d4-4699-8bdc-52040c712cab",
              AdUnitId : "test"
            };
            self._adReady$.next(true);
            self._adReady$.complete();
            isReady = true;
          }
        }
      });
    }
  }

  iniAdMob() {
    const self = this;
    // * [2018-08-15 16:17] Initialize admobid
    if ( /(android)/i.test(navigator.userAgent) ) {
      self.admobid = { // for Android
        banner: 'ca-app-pub-3940256099942544/6300978111',
        interstitial: 'ca-app-pub-3940256099942544/1033173712',
        rewardvideo: 'ca-app-pub-3940256099942544/5224354917',
      };
    } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
      self.admobid = { // for iOS
        banner: 'ca-app-pub-3940256099942544/4480807092',
        interstitial: 'ca-app-pub-3940256099942544/4411468910',
        rewardvideo: 'ca-app-pub-3940256099942544/1712485313',
      };
    } else {
      self.admobid = { // for Windows Phone
        banner: 'ca-app-pub-6869992474017983/8878394753',
        interstitial: 'ca-app-pub-6869992474017983/1355127956',
        rewardvideo: '',
      };
    }

    if (self.device.isCordova) {
      self.device.onDeviceReady.subscribe(_ => {
        if (!!window['AdMob']) {
          self.interstitial = window['AdMob'];
          self._adReady$.next(true);
        } else {
          self._adReady$.next(false);
        }
        self._adReady$.complete();
      });
    }
  }
}
