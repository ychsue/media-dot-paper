import { Injectable } from '@angular/core';
import { nSQL, NanoSQLInstance } from 'nano-sql';
import { CordovaService } from './cordova.service';
import { GvService } from './gv.service';
import { MessageService, MessageTypes } from './message.service';
import { playerType } from './media-edit.service';
import { StickyObservable } from '../extends/sticky-observable';
import { Subscriber, Observable } from 'rxjs';
import { first, shareReplay } from '../../../node_modules/rxjs/operators';
import 'rxjs/add/operator/toPromise';
import { _NanoSQLQuery } from '../../../node_modules/nano-sql/lib/query/std-query';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  static storyTableName = 'stories';
  static storyModel = [
    {key: 'id', type: 'uuid', props: [ 'pk']},
    {key: 'name', type: 'string'},
    {key: 'title', type: 'string', props: ['trie']},
    {key: 'makeTime', type: 'int'},
    {key: 'modifyTime', type: 'int'},
    {key: 'viewTime', type: 'int'},
    {key: 'urlOrID', type: 'string', default: ''},
    {key: 'meType', type: 'int', default: 0},
    {key: 'frames', type: 'map', default: {}}
  ];

  private _isInitialized = false;
  public get isInitialized(): boolean {
    return this._isInitialized;
  }

  onDBReady: Observable<boolean>;

  nStories = 0;

  constructor(private cService: CordovaService, private msgService: MessageService) {
    const self = this;
    const subscriber = observer => {
      const action = async () => {
        if (cService.isCordova) {await cService.onDeviceReady.toPromise(); }
        await self.iniNanoSQL.bind(self)(observer);
      };
      action();
    return () => {};
    };
    // this.onDBReady = StickyObservable.createWithInit<boolean>(subscriber); //original one
    this.onDBReady = (new Observable<boolean>(subscriber)).pipe(shareReplay(1), first());
    this.onDBReady.subscribe(); // initialize it!!!
  }

  getSampleItem() {
    const now = Date.now();
    const result = {name: 'test',
    makeTime: now,
    modifyTime: now,
    viewTime: now,
    urlOrID: 'https://youtu.be/f1SZ5GaAp3g',
    meType: playerType.url};

    return result;
  }

  async iniNanoSQL(ob: Subscriber<boolean>) {
    const mode = (!!window['nSQLite']) ? window['nSQLite'].getMode() : 'PERM';
    const buf = await nSQL(DbService.storyTableName)
    .model(DbService.storyModel)
    .config({
      mode: mode
    })
    .connect();
    this._isInitialized = true;
    ob.next(true);

    this.msgService.pushMessage({type: MessageTypes.Info, message: buf.toString() });

    let rows = await nSQL(DbService.storyTableName).query('select', ['COUNT(*) AS count']).exec();
    if (!!rows[0].count && rows[0].count > 0) {
    } else {
      rows = await this.upsertAsync();
    }
    this.msgService.pushMessage({type: MessageTypes.Info, message: JSON.stringify(rows) });

  }

  async searchAsync(tName: string = DbService.storyTableName,
    selOptions?: any, where?: any, orderBy?: any, offset?: number, limit?: number) {
    await this.onDBReady.toPromise(); // make sure it is finished
    let select: _NanoSQLQuery;
    if (!!selOptions) {
      select = nSQL(tName).query('select', selOptions);
    } else {
      select = nSQL(tName).query('select');
    }
    if (!!where) {select = select.where(where); }
    if (!!orderBy) {select = select.orderBy(orderBy); }
    if (!!offset) {select = select.offset(offset); }
    if (!!limit) {select = select.limit(limit); }

    return select.exec();
  }

  async deleteAsync(tName: string = DbService.storyTableName, where: any = ['viewTime', '>', 0]) {
    await this.onDBReady.toPromise();
    let q = nSQL(tName).query('delete');
    if (!!where) {q = q.where(where); }

    let result: any;
    try {
      result = await q.exec();
    } catch (error) {
      result = {};
      this.msgService.pushMessage({type: MessageTypes.Error, message: error});
    }
    return result;
  }

  async upsertAsync(tName: string = DbService.storyTableName, item?: any, where?: any) {
    await this.onDBReady.toPromise();
    if (!!item === false) {item = this.getSampleItem(); }
    let q = nSQL(tName).query('upsert', item);
    if (!!where) { q = q.where(where); }
    let result: any;
    try {
      result = await q.exec();
    } catch (error) {
      result = {};
      this.msgService.pushMessage({type: MessageTypes.Error, message: error});
    }
    this.msgService.pushMessage({type: MessageTypes.Info, message: JSON.stringify(result)});
    return result;
  }
}
