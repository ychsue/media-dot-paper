import { Injectable } from '@angular/core';
import { nSQL } from 'nano-sql';
import { CordovaService } from './cordova.service';
import { GvService } from './gv.service';
import { MessageService, MessageTypes } from './message.service';
import { playerType } from './media-edit.service';
import { StickyObservable } from '../extends/sticky-observable';
import { Subscriber } from 'rxjs';
import { first } from '../../../node_modules/rxjs/operators';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  static storyTableName = 'stories';

  private _isInitialized = false;
  public get isInitialized(): boolean {
    return this._isInitialized;
  }

  onDBReady: StickyObservable<boolean>;

  nStories = 0;

  constructor(private cService: CordovaService, private msgService: MessageService) {
    const self = this;
    this.onDBReady = StickyObservable.createWithInit<boolean>(observer => {
      const action = async () => {
        if (cService.isCordova) {await cService.onDeviceReady.toPromise(); }
        await self.iniNanoSQL.bind(self)(observer);
      };
      action();
    return () => {};
    });
  }

  async iniNanoSQL(ob: Subscriber<boolean>) {
    const buf = await nSQL(DbService.storyTableName)
    .model([
      {key: 'id', type: 'int', props: ['ai', 'pk']},
      {key: 'name', type: 'string'},
      {key: 'title', type: 'string'},
      {key: 'makeTime', type: 'int'},
      {key: 'modifyTime', type: 'int'},
      {key: 'urlOrID', type: 'string'},
      {key: 'meType', type: 'int'},
      {key: 'frames', type: 'map'}
    ])
    .config({
      mode: (!!window['nSQLite']) ? window['nSQLite'].getMode() : 'PERM'
    })
    .connect();
    this._isInitialized = true;
    ob.next(true);

    this.msgService.pushMessage({type: MessageTypes.Info, message: buf.toString() });

    let rows = await nSQL(DbService.storyTableName).query('select', ['COUNT(*) AS count']).exec();
    if (!!rows[0].count && rows[0].count > 0) {
    } else {
      rows = await nSQL(DbService.storyTableName).query('upsert',
      {name: 'test',
      makeTime: Date.now(),
      modifyTime: Date.now(),
      urlOrID: 'https://youtu.be/f1SZ5GaAp3g',
      meType: playerType.url}).exec();
    }
    this.msgService.pushMessage({type: MessageTypes.Info, message: JSON.stringify(rows) });

  }
}
