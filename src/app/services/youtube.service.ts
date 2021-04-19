import { Injectable } from '@angular/core';
import { Subject, fromEvent, timer, merge } from 'rxjs';
import { first, takeWhile } from 'rxjs/operators';
// import 'rxjs/add/operator/first';
import { MessageService, MessageTypes } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  static regYT = /^(http(s)?:\/\/)?(((.*\.youtube\.com)\/.*[\?\&]v=([^\&]+))|(youtu\.be\/([^\&]+)))/i;

  ytPlayer: YT.Player;
  onReady: Subject<YT.PlayerEvent>;
  onStateChange: Subject<YT.OnStateChangeEvent>;
  onError: Subject<YT.OnErrorEvent>;

  isScriptEmbedded = false;

  private _isApiReady = false;
  public get isApiReady(): boolean {
    return this._isApiReady;
  }
  public set isApiReady(v: boolean) {
    if (v === true) {
      this.onApiReday.next(v);
    }
    this._isApiReady = v;
  }
  onApiReday = new Subject<boolean>();

  static isYoutubeURL(url: string): boolean {
    return this.regYT.test(url);
  }

  static getYTId(url: string): string {
    const result = this.regYT.exec(url);
    return (result[6] || result[8]);
  }

  constructor(private msgService: MessageService) {
    this.onReady = new Subject<YT.PlayerEvent>();
    this.onStateChange = new Subject<YT.OnStateChangeEvent>();
    this.onError = new Subject<YT.OnErrorEvent>();
  }

  embedApiScript() {
    // * [2018-06-19 11:36] For Youtube, gotten from
    // https://stackoverflow.com/questions/36467532/use-youtube-iframe-api-with-angular2-and-typescript
    if (this.isScriptEmbedded === true) {
      return;
    } else {
      this.isScriptEmbedded = true;
    }
    const doc = window.document;
    (<any>window).onYouTubeIframeAPIReady = () => {
      this.isApiReady = true;
      this.msgService.pushMessage({ type: MessageTypes.Info, message: 'Youtube Api is initialized' });
    };
    const apiScript = doc.createElement('script');
    apiScript.type = 'text/javascript';
    apiScript.src = 'https://www.youtube.com/iframe_api';
    doc.body.appendChild(apiScript);
  }

  loadURLforPlayer(uiEle: HTMLIFrameElement, VId: string) {
    if (!!window['YT'] === false) {
      this.onApiReday.pipe(first()).subscribe(() => this.loadURLforPlayer(uiEle, VId));
      return;
    }
    const self = this;
    const shouldKeepLoading = takeWhile((x: any) => {
      if (typeof x === "number" && x >= 5) { return false; }
      // if (!!!self.ytPlayer?.playVideo) {
      //   self.ytPlayer?.destroy();
      //   self.ytPlayer = null;
      // }
      // console.log(`ytPlayer stat: ${self.ytPlayer?.playVideo}`);
      return !!!self.ytPlayer?.loadVideoById;
    });

    merge(timer(1000, 1000), fromEvent(uiEle, 'load')).pipe(
      shouldKeepLoading,
    ).subscribe(_ => {
      if (!!self.ytPlayer?.loadVideoById && (self.ytPlayer.getIframe() === uiEle)) {
        self.ytPlayer.loadVideoById(VId);
      } else {
        if (!!self.ytPlayer) {
          // self.ytPlayer.destroy(); // ******************** TODO *****************************
          return; // Do nothing, just wait
        }
        self.ytPlayer = new YT.Player(uiEle, {
          events: {
            'onReady': (ev) => { self.onReady.next(ev); },
            'onStateChange': (ev) => { self.onStateChange.next(ev); },
            'onError': (ev) => { self.onError.next(ev); },
            'onApiChange': (ev) => {
              // ************************* TODO for caption******************************
              // console.log('ytPlayer.getOptions?' + JSON.stringify(self.ytPlayer['getOptions']()));
            }
          }
        });
      }
    });
    uiEle.src = `https://www.youtube.com/embed/${VId}?enablejsapi=1&html5=1&playsinline=1`;
  }
}
