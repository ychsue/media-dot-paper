import { Injectable } from '@angular/core';
import { Observable, fromEvent, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  isCordova: boolean;
  channel: any;

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

  onNoButtonPressed$ = new Subject<boolean>();

  constructor() {
    // * [2018-06-??] For cordova
    this.isCordova = !!window.cordova;
    const self = this;
    if (this.isCordova) {
      this.channel = cordova.require('cordova/channel');
      this.onDeviceReady = new Observable(ob => {
        this.channel.onDeviceReady.subscribe( () => {
          ob.next(); // For subscribe
          ob.complete(); // For toPromise and auto-unsubscribe
        });
      });
    }

    // * [2018-07-17 19:50] For pointing device's events
    this.onPointerdown$ = fromEvent(document, 'pointerdown') as Observable<PointerEvent>;
    this.onPointermove$ = fromEvent(document, 'pointermove') as Observable<PointerEvent>;
    // this.onPointermove$ = new Observable(ob => document.addEventListener('pointermove', e => {
    //   const ev = e as PointerEvent;
    //   ob.next(ev);
    //   console.log(ev.screenX);
    // }));
    this.onPointerup$ = fromEvent(document, 'pointerup') as Observable<PointerEvent>;
    this.onPointerout$ = fromEvent(document, 'pointerout') as Observable<PointerEvent>;
    this.onMouseup$ = fromEvent(document, 'mouseup') as Observable<MouseEvent>;
    this.onMousemove$ = fromEvent(document, 'mousemove') as Observable<MouseEvent>;
    // this.onMousemove$ = new Observable(ob => document.addEventListener('mousemove', e => {
    //   const ev = e as MouseEvent;
    //   ob.next(ev);
    //   console.log(ev.screenX);
    // }));
    this.onMousedown$ = fromEvent(document, 'mousedown') as Observable<MouseEvent>;

    this.onWindowResize$ = fromEvent(window, 'resize') as Observable<Event>;
  }
}
