import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  remindMsgIn: Subject<number> = new Subject();

  private _messages: OneMessage[] = [];
  private _nRead = 0;

  pushMessage(msg: OneMessage) {
    this._messages.push(msg);
    this.remindMsgIn.next(this._messages.length - this._nRead);
  }

  readMessages() {
    this._nRead = this._messages.length;
    return this._messages;
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
