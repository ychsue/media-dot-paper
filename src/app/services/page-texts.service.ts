import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, from } from 'rxjs';
import { take, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PageTextsService {
  pts: IPageTexts;

  _ptsLoaded$ = new Subject<IPageTexts>();
  public get ptsLoaded$(): Observable<IPageTexts> {
    return this._ptsLoaded$;
  }

  langCode: string;
  langList: EachLang[] = [
    {name: "中文", isoCode: "zh-tw"},
    {name: "English", isoCode: "en"},
    {name: "Indonesia", isoCode: "id"}
  ];

  PTSReady$: Observable<boolean>;

  _ptsKey = "PTS";
  _isoCodeKey = "IsoCode";
  constructor(private http: HttpClient) {
      const self = this;
      self.PTSReady$ = from(self._iniPTS$$()).pipe(shareReplay(1));
  }

  private async _iniPTS$$() {
    let result = await this.loadPTSFromStorage$$();
    if (!!result === false) {
      const lang = navigator.language;
      result = await this.loadPTS$$();
      this.savePTS2Storage();
    }
    return (!!result);
  }

  async loadPTS$$(isoCode = 'en', isSaveIntoStorage = false) {
    const self = this;
    const httpGet = this.http.get(`assets/i18n/${isoCode}/pageTexts.json`).pipe(take(1));
    let obj: IPageTexts = null;
    try {
      obj = await httpGet.toPromise() as IPageTexts;
      self.langCode = isoCode;
      self.pts = obj as IPageTexts;
      self._ptsLoaded$.next(self.pts);
      if (isSaveIntoStorage === true) {
        self.savePTS2Storage();
      }
    } catch (error) {
      self._ptsLoaded$.next(null);
    }
    return obj;
  }

  async loadPTSFromStorage$$() {
    const self = this;
    let code: string = null;
    try {
      code = window.localStorage.getItem(self._isoCodeKey);
    } catch (error) {
      code = null;
    }
    if (!!code) {
      self.langCode = code;
      self.pts = JSON.parse(window.localStorage.getItem(self._ptsKey)) as IPageTexts;
      self._ptsLoaded$.next(self.pts);
    }

    return (!!code) ? self.pts : null;
  }

  savePTS2Storage() {
    const self = this;
    if (!!this.pts) {
      window.localStorage.setItem(self._ptsKey, JSON.stringify(this.pts));
      window.localStorage.setItem(self._isoCodeKey, self.langCode);
    }
  }
}

export interface EachLang {
  name: string;
  isoCode: string;
}
