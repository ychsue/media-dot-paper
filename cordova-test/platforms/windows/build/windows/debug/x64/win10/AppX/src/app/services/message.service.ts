import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { DialogComponent, DialogType } from '../dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  remindMsgIn: Subject<number> = new Subject();

  isShown = true;

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

  constructor(public dialog: MatDialog) { }

  alert(msg: string, alertCallback?: Function, title?: string, buttonName?: string) {
    if (!!alertCallback === false) {
      alertCallback = () => {};
    }
    if (!!window.cordova === true) {
      this.dialog.open(DialogComponent, {
        width: '50%',
        data: {dType: DialogType.alert, msg: msg}
      });
    } else {
      this.alert(msg);
    }
  }
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
