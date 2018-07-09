import { Injectable } from '@angular/core';
import { nSQL } from 'nano-sql';
import { CordovaService } from './cordova.service';
import { GvService } from './gv.service';
import { MessageService, MessageTypes } from './message.service';
import { playerType } from './media-edit.service';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  static storyTableName = 'stories';

  private _isInitialized = false;
  public get isInitialized(): boolean {
    return this._isInitialized;
  }

  nStories = 0;

  constructor(private cService: CordovaService, private msgService: MessageService) {
    const self = this;
    if (cService.isCordova) {
      cService.onDeviceReady.subscribe(this.iniNanoSQL.bind(self));
    } else {
      this.iniNanoSQL();
    }
  }

  async iniNanoSQL() {
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
