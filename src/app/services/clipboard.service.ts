import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceService } from './device.service';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {

  // getText$$: Promise<string>;
  constructor(private device: DeviceService) {
  }

  getText$$() {
    return new Promise<string>((res, rej) => {
      if (!!cordova.plugins) {
        cordova.plugins.clipboard.paste(t => res(t), e => rej(e));
      } else {
        rej('cordova.plugins is undefined');
      }
    });
  }
}
