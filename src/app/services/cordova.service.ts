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
    if (this.isCordova) {
      this.channel = cordova.require('cordova/channel');
      this.onDeviceReady = this.channel.onDeviceReady;
    }
  }
}
