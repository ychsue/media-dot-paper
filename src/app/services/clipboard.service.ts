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
      if (!!window?.cordova?.plugins && cordova.platformId !== 'browser' && !!cordova.plugins.clipboard) {
        cordova.plugins.clipboard.paste(t => res(t), e => rej(e));
      } else if(!!window?.Windows) {
        try {
          var text = "";
          var dataPackageView =
            Windows.ApplicationModel.DataTransfer.Clipboard.getContent();
          if (
            dataPackageView.contains(
              Windows.ApplicationModel.DataTransfer.StandardDataFormats
                .text
            )
          ) {
            dataPackageView.getTextAsync().then(function (value) {
              text = value;
              res(text);
            });
          } else {
            throw new Error("not a txt in clipboard");
          }
        } catch (e) {
          rej(e);
        }

      } else if (!!window?.navigator?.clipboard) {
        window.navigator.clipboard.readText()
          .then(t => { res(t) })
          .catch(e => { rej(e) });
      } else {
        rej('cordova.plugins is undefined');
      }
    });
  }
}
