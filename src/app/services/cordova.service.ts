import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class CordovaService {

  isCordova: boolean;
  channel: any;

  // * Observable
  onDeviceReady: Observable<null>;

  constructor() {
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
  }
}
