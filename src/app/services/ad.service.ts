import { Injectable } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { take, last, share, shareReplay, first } from "rxjs/operators";
import { DeviceService } from './device.service';
import * as pv from '../privateValues'; // SORRY, I did not commit this file since it is for my private variables.
import { MessageService } from './message.service';
import { PageTextsService } from './page-texts.service';
import Interstitial from 'cordova-test/plugins/cordova-admob-plus/www/interstitial';
// You need to create it in src/app folder. In src/app/privateValues.ts, give it
//    export const adIntAndroid = '';
//    export const adIntIOS = '';
//    export const adIntWindows = '';
//    export const adIntUnitIdWin = '';
// so that you can tell this code to use the default values.

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

  private _adReady$ = new Subject<boolean>();
  // public get adReady$(): Observable<boolean> {
  //   return this._adReady$.pipe(first());
  // }
  private _isAdMobReady = false;

  adReady$ = this._adReady$.pipe(shareReplay(1));

  isHinderAdInt = false;

  msAdv: any;
  interstitial: any;

  constructor(private device: DeviceService, private ptsService: PageTextsService,
    public msg: MessageService) {
    const self = this;
    if (!!window.cordova) {
      if (cordova.platformId === 'windows') {
        self.iniWinSDK();
      } else if (cordova.platformId === 'android' || cordova.platformId === 'ios') {
        // Because it will crash at marshmallow, I need to turn it off.
        if ( (cordova.platformId === 'android') && (navigator.appVersion.toLowerCase().indexOf('marshmallow') < 0)) {
          self.iniAdMob();
        }
      } else {
        self._adReady$.next(false);
        self._adReady$.complete();
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
        } else if (!!window['admob']) {
          (<Interstitial>self.interstitial).load(
            {
              id: {
                android: self.admobid.interstitial,
                ios: self.admobid.interstitial
              }
            }
            // {adId: self.admobid.interstitial, autoShow: false}
          ).then( () => {
            self._isAdMobReady = true;
          }).catch(err => {
            console.log(err);
            self._isAdMobReady = false;
          });
        }
      }
    });
  }

  async isAdIntReady$$() {
    const self = this;
    if (!!window['MicrosoftNSJS']) {
      return self.interstitial.state === window['MicrosoftNSJS'].Advertising.InterstitialAdState.ready;
    } else if (!!window['admob']) {
      return self._isAdMobReady;
    } else {
      return false;
    }
  }

  async showInterstitial() {
    const self = this;
    // self.adReady$.subscribe(isReady => {
      let isReady = await self.adReady$.pipe(first()).toPromise();
      isReady = isReady && await self.isAdIntReady$$();
      if (isReady && self.isHinderAdInt === false) {
        self.isHinderAdInt = true;
        await self.msg.alert$$((!!self.ptsService.pts) ? self.ptsService.pts.adService.showAdLater
         : "<h1>Attention</h1> It takes time to load the media. So I'll show you an Ad.");
        if (!!window['MicrosoftNSJS']) {
          self.interstitial.show();
        } else if (!!window['admob']) {
          self.interstitial.show();
          self._isAdMobReady = false;
        }
        // * [2018-08-18 15:47] Renew it 2 min later
        setTimeout(() => {
          self.prepareInterstitial();
          self.isHinderAdInt = false;
        }, 1000 * 60 * 2);
      }
    // });
  }

  iniWinSDK() {
    const self = this;
    if (!!window.cordova && cordova.platformId === 'windows') {
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
              AppId : (!!pv.adIntWindows) ? pv.adIntWindows : "d25517cb-12d4-4699-8bdc-52040c712cab",
              AdUnitId : (!!pv.adIntUnitIdWin) ? pv.adIntUnitIdWin : "test"
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
        interstitial: (!!pv.adIntAndroid) ? pv.adIntAndroid : 'ca-app-pub-3940256099942544/1033173712',
        rewardvideo: 'ca-app-pub-3940256099942544/5224354917',
      };
    } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
      self.admobid = { // for iOS
        banner: 'ca-app-pub-3940256099942544/4480807092',
        interstitial: (!!pv.adIntIOS) ? pv.adIntIOS : 'ca-app-pub-3940256099942544/4411468910',
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
        if (!!window['admob']) {
          self.interstitial = window['admob'].interstitial as Interstitial;
          self._adReady$.next(true);
        } else {
          self._adReady$.next(false);
        }
        self._adReady$.complete();
      });
    }
  }
}
