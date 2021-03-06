import { Injectable } from '@angular/core';
import { Observable, fromEvent, Subject, concat, of } from 'rxjs';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { map, share, shareReplay, timestamp } from 'rxjs/operators';

interface Isize {
  width: number;
  height: number;
}

@Injectable({
  providedIn: "root",
})
export class DeviceService {
  isCordova: boolean;
  isWinRT: boolean;
  channel: any;

  isInitialized = false;

  // * Observable
  onDeviceReady: Observable<null>;
  onPointerdown$: Observable<PointerEvent>;
  onPointermove$: Observable<PointerEvent>;
  onPointerup$: Observable<PointerEvent>;
  onPointerout$: Observable<PointerEvent>;
  onMouseup$: Observable<MouseEvent>;
  onMousemove$: Observable<MouseEvent>;
  onMousedown$: Observable<MouseEvent>;

  onWindowResize$: Observable<Event>;
  onWindowResizeReplay$: Observable<Timestamp<Isize>>;

  onNoButtonPressed$ = new Subject<boolean>();
  private _onMyActivated$ = new Subject<any>();
  onMyActivated$ = this._onMyActivated$.pipe(shareReplay(1));

  permissions: AndroidPermissions;

  constructor() {
    // * [2018-06-??] For cordova
    this.isCordova = !!window.cordova;
    this.isWinRT = !!window?.Windows;

    const self = this;
    self.onMyActivated$.subscribe(); // Just to turn it on
    if (this.isCordova) {
      this.channel = cordova.require("cordova/channel");
      this.onDeviceReady = new Observable((ob) => {
        this.channel.onDeviceReady.subscribe(() => {
          ob.next(); // For subscribe
          ob.complete(); // For toPromise and auto-unsubscribe
          // *[2019-01-25 13:17] Initialize some cordova APIs
          if (!!!self.isInitialized) {
            self.isInitialized = true;
            self.initCordovaAPIS();
          }
        });
      });
    } else if (!!window.Windows) {
      self._emitInitActivated();
      self.initWindowsAPIS();
    } else {
      self._emitInitActivated();
    }

    // * [2018-07-17 19:50] For pointing device's events
    this.onPointerdown$ = fromEvent(
      document,
      "pointerdown"
    ) as Observable<PointerEvent>;
    this.onPointermove$ = fromEvent(
      document,
      "pointermove"
    ) as Observable<PointerEvent>;
    // this.onPointermove$ = new Observable(ob => document.addEventListener('pointermove', e => {
    //   const ev = e as PointerEvent;
    //   ob.next(ev);
    //   console.log(ev.screenX);
    // }));
    this.onPointerup$ = fromEvent(
      document,
      "pointerup"
    ) as Observable<PointerEvent>;
    this.onPointerout$ = fromEvent(
      document,
      "pointerout"
    ) as Observable<PointerEvent>;
    this.onMouseup$ = fromEvent(document, "mouseup") as Observable<MouseEvent>;
    this.onMousemove$ = fromEvent(
      document,
      "mousemove"
    ) as Observable<MouseEvent>;
    // this.onMousemove$ = new Observable(ob => document.addEventListener('mousemove', e => {
    //   const ev = e as MouseEvent;
    //   ob.next(ev);
    //   console.log(ev.screenX);
    // }));
    this.onMousedown$ = fromEvent(
      document,
      "mousedown"
    ) as Observable<MouseEvent>;

    this.onWindowResize$ = fromEvent(window, "resize") as Observable<Event>;
    const subs1 = of({
      value: { width: window?.innerWidth, height: window?.innerHeight },
      timestamp: 0,
    } as Timestamp<Isize>);
    const subs2 = this.onWindowResize$.pipe(
      map(
        (x) =>
          ({ width: window.innerWidth, height: window.innerHeight } as Isize)
      ),
      timestamp()
    );
    this.onWindowResizeReplay$ = concat(subs1, subs2).pipe(shareReplay(1));
    // window['onResize$'] = this.onWindowResizeReplay$;
  }

  onLinkToUrl(sUrl: string) {
    if (!!window["cordova"] && cordova.platformId === "osx") {
      cordova["InAppBrowser"].open(sUrl, "_system", "location=yes");
    }
  }

  private _emitInitActivated() {
    const self = this;
    // ** [2019-03-04 16:43] Get data from initEventArgs
    if (!!window["initEventArgs"] && !!window["initEventArgs"].activated) {
      const args = window["initEventArgs"].activated;
      window["initEventArgs"].activated = null;
      // * [2019-02-16 16:03] For file extensions
      self._onMyActivated$.next(args);
    } else {
    }
  }

  initWindowsAPIS() {
    const self = this;
    Windows.UI.WebUI.WebUIApplication.onactivated = (ev) => {
      let output;
      const args = <Windows.ApplicationModel.Activation.IActivatedEventArgs>(
        ev.detail[0]
      );
      if (
        args.kind === Windows.ApplicationModel.Activation.ActivationKind.file
      ) {
        const buf = (<
          Windows.ApplicationModel.Activation.FileActivatedEventArgs
        >args).files[0];
        if (!!window["MSApp"]) {
          try {
            output = {
              data: window.MSApp.createFileFromStorageFile(buf),
              type: "file",
            };
          } catch (error) {
            console.log(error);
          }
        }
      } else if (
        args.kind ===
        Windows.ApplicationModel.Activation.ActivationKind.protocol
      ) {
        output = {
          data: (<
            Windows.ApplicationModel.Activation.ProtocolActivatedEventArgs
          >args).uri,
          type: "uri",
        };
      }
      self._onMyActivated$.next(output);
    };
  }

  initCordovaAPIS() {
    const self = this;
    if (!!!window["cordova"]) {
      return;
    }
    if (!!cordova["plugins"] && !!cordova.plugins["permissions"]) {
      this.permissions = cordova.plugins.permissions;
    }

    window.open = cordova["InAppBrowser"].open;

    // * [2019-02-16 15:36] For cordova's (windows') activated event which is defined in index.html
    if (!!window.cordova) {
      self._emitInitActivated();
      // ** [2019-03-04 16:43] For different platform
      if (cordova.platformId === "windows") {
        self.initWindowsAPIS();
      } else {
        // For ios, osx and Android
        window["handleOpenURL"] = (data: string, inType: string) => {
          if (!inType) {
            inType = "uri";
          } else if (inType === "text") {
            inType = "uri";
            data = decodeURIComponent(data);
          }
          const output = { data: data, type: inType };
          self._onMyActivated$.next(output);
        };
        // For Android system
        if (cordova.platformId === "android") {
          // * [2019-03-06 16:32] handling openwith plugin
          const openwith = (<any>cordova).openwith;
          openwith.init(
            () => console.log("load openwith successfully."),
            (err) => console.log(`load openwith Failed. Message: ${err}`)
          );
          openwith.addHandler((intent) => {
            if (intent.items.length > 0) {
              openwith.load(intent.items[0], (data, item) => {
                window["handleOpenURL"](data, "text");
                if (intent.exit) {
                  openwith.exit();
                }
              });
            } else {
              if (intent.exit) {
                openwith.exit();
              }
            }
          });
        }
      }
    }
  }

  /**
   * This one is used to get the permission if needed
   * @param type = cordova.plugins.permissions.XXXXXX
   */
  async getPermissionIfNeeded(type: any) {
    const self = this;
    if (!!!self.permissions) {
      return true; // Lazy way, assuming the OS will remind the user when the user is out of some permissions
    }

    const check$$ = new Promise<AndroidPermissionsState>((res, rej) => {
      self.permissions.checkPermission(type, res, rej);
    });
    const request$$ = new Promise<AndroidPermissionsState>((res, rej) => {
      self.permissions.requestPermission(type, res, rej);
    });
    // * [2019-01-25 13:48] Check at first
    let isOK = !!(await check$$).hasPermission;
    if (isOK) {
      return true;
    } else {
      isOK = !!(await request$$).hasPermission;
      return isOK;
    }
  }
}
