import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  remindMsgIn: Subject<number> = new Subject();

  isShown = false;

  private _messages: OneMessage[] = [];
  private _nRead = 0;

  pushMessage(msg: OneMessage) {
    this._messages.push(msg);
    this.remindMsgIn.next(this.getNUnRead());
  }

  readMessages() {
    this._nRead = this._messages.length;
    this.remindMsgIn.next(0);
    const origin = this._messages.slice(0);
    const result = this._messages.reverse();
    this._messages = origin;
    return result;
  }

  getNUnRead() {
    return this._messages.length - this._nRead;
  }

  constructor() { }


}

export class OneMessage {
  type: MessageTypes;
  message: string;
  constructor() {
  }
}

export enum MessageTypes {
  Info,
  Warn,
  Error
}
