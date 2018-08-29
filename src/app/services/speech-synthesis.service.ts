import { Injectable } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { take, map, takeWhile, shareReplay, last } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpeechSynthesisService {

  voices: SpeechSynthesisVoice[];
  defaultVoice: SpeechSynthesisVoice;

  private _getVoices$ = new Subject<boolean>();
  getVoices$ = this._getVoices$.pipe(shareReplay(1));

  constructor() {
    this.updateVoices$$();
   }

  async updateVoices$$() {
    let voices: SpeechSynthesisVoice[];
    // * [2018-08-23 11:05] Try 5 times to get the voices
    await interval(100).pipe(take(5),
      takeWhile(_ => {
        voices = speechSynthesis.getVoices();
        return !!voices === false || voices.length === 0;
      })
    ).toPromise();

    // * [2018-08-23 11:07] If I got the voice, set the default voice
    if (!!voices !== false && voices.length > 0) {
      this.defaultVoice = voices.find(v => /en.*US/.test(v.lang));
      this.defaultVoice = (!!this.defaultVoice) ? this.defaultVoice : voices[0];
      this._getVoices$.next(true);
    }

    this.voices = voices;
  }

  speak(para: SSutterParameters ) {
    if (!!para === false) {
      alert(`Warning: input of SpeechSynthesisService.speak cannot be ${para}`);
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

  updateUtterParaWithVoice(old: SSutterParameters): SSutterParameters {
    if (!!old.voiceName === true) {
      old.voice = this.voices.find(v => v.name === old.voiceName);
      if (!!old.voice === true) {return old; }
    }

    if (!!old.lang === true) {
      old.voice = this.voices.find(v => v.lang === old.lang);
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
  text = 'test';
  voice?: SpeechSynthesisVoice;
  volume = 1;
 }
