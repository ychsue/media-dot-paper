import { Injectable } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { take, map, takeWhile, shareReplay, last, first, concat } from 'rxjs/operators';
import { DeviceService } from './device.service';
import { PageTextsService } from './page-texts.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class SpeechSynthesisService {

  voices: SpeechSynthesisVoice[];
  defaultVoice: SpeechSynthesisVoice;

  private _getVoices$ = new Subject<boolean>();
  getVoices$ = this._getVoices$.pipe(shareReplay(1));

  constructor(public msg: MessageService, private device: DeviceService, private ptsService: PageTextsService) {
    const self = this;
    this.updateVoices$$();
    if (!!window.cordova && cordova.platformId === 'android') {
      ptsService.PTSReady$.pipe(concat(ptsService.ptsLoaded$)).subscribe(_ => {
        // **************** TODO: To notice it that the voices is changed (at least for differnt language) **************
        if (!!self.voices === true) {
          self.voices = self.voices.slice(0);
        }
      });
    }
   }

  async updateVoices$$() {
    let voices: SpeechSynthesisVoice[];

    if (this.device.isCordova && cordova.platformId === 'android') {
      await this.device.onDeviceReady.pipe(first()).toPromise();
      voices = await window['TTS'].getVoices() as SpeechSynthesisVoice[];
    } else {
      if (!!window['speechSynthesis'] === false) {return; } // For the case without speechSynthesis
      // * [2018-08-23 11:05] Try 5 times to get the voices
      await interval(100).pipe(take(5),
        takeWhile(_ => {
          voices = speechSynthesis.getVoices();
          return !!voices === false || voices.length === 0;
        })
      ).toPromise();
    }

    // * [2018-08-23 11:07] If I got the voice, set the default voice
    if (!!voices !== false && voices.length > 0) {
      voices = voices.sort( (a , b) => (a.lang < b.lang) ? -1 : 1);
      this.defaultVoice = voices.find(v => /en.*US/.test(v.lang));
      this.defaultVoice = (!!this.defaultVoice) ? this.defaultVoice : voices[0];
      this._getVoices$.next(true);
    }

    this.voices = voices;
  }

  getVoiceName(voiceOrLang: string| SpeechSynthesisVoice) {
    if (typeof voiceOrLang === 'string') { // From langCode
      const voice = this.voices.find(v => v.lang.replace('_', '-') === (<string>voiceOrLang).replace('_', '-'));
      if (!!voice) {
        return voice.name;
      } else {
        return "";
      }
    } else { // From set-speech-synthesis.component
      if (!!window.cordova && cordova.platformId !== 'windows') {
        const voice = voiceOrLang as SpeechSynthesisVoice;
        const codes = voice.lang.split(/(\-|\_)/);
        if (!!this.ptsService.pts === false) {
          return voice.name;
        } else {
          let result = "";
          let buf = "";
          buf = this.ptsService.pts.iso639[codes[0]];
          if (!!buf) {
            result += buf;
          }
          if (!!buf === true) {
            result += ': ';
          }
          if (codes.length === 3) {
            buf = this.ptsService.pts.iso3166Country[codes[2]];
            if (!!buf) {
              result += buf;
            }
          }
          // * [2018-08-31 16:46] Give more information
          if (cordova.platformId === 'android') {
            buf = voice.name.substring(voice.name.lastIndexOf('#') + 1);
            result += '(' + buf + ')';
          } else {
            result = '(' + result + ')' + voice.name;
          }
          return result;
        }
      } else { // Not an Android system
        return voiceOrLang.name;
      }
    }
  }

  speak(para: SSutterParameters ) {
    if (this.device.isCordova && cordova.platformId === 'android') {
      window['TTS'].stop();
      if (!!para.voiceName === false) {
        para.voiceName = this.getVoiceName(para.lang);
      }
      const androidPara = Object.assign({name: para.voiceName}, para);
      window['TTS'].speak(androidPara);
    } else {
      if (!!para === false) {
        this.msg.alert(`Warning: input of SpeechSynthesisService.speak cannot be ${para}`);
        return;
      }
      // * [2018-08-22 19:53] Cancel previous utterance
      speechSynthesis.pause();
      speechSynthesis.cancel();
      // * [2018-08-22 19:53] Create a new utterance
      const utter = new SpeechSynthesisUtterance(para.text);
      utter.pitch = para.pitch;
      utter.rate = para.rate;
      utter.volume = para.volume;
      if (!!para.voice === true) {
        utter.voice = para.voice;
      } else {
        utter.lang = para.lang;
      }
      // * [2018-08-22 19:54] Play it
      speechSynthesis.speak(utter);
      speechSynthesis.resume();
    }
  }

  updateUtterParaWithVoice(old: SSutterParameters): SSutterParameters {
    if (!!old.voiceName === true) {
      old.voice = this.voices.find(v => v.name === old.voiceName);
      if (!!old.voice === true) {return old; }
    }

    if (!!old.lang === true) {
      old.voice = this.voices.find(v => v.lang.replace('_', '-') === old.lang.replace('_', '-'));
      if (!!old.voice === true) {return old; }
    }

    return old;
  }
}

 export class SSutterParameters {
  lang = 'en-US';
  voiceName?: string;
  pitch = 1;
  rate = 1;
  text = '';
  voice?: SpeechSynthesisVoice;
  volume = 1;
 }
