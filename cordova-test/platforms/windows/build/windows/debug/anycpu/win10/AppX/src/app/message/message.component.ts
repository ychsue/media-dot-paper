import { Component, OnInit } from '@angular/core';
import { MessageService, OneMessage, MessageTypes } from '../services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  messages: OneMessage[];
  msgType = MessageTypes;
  constructor(private msgService: MessageService) { }

  showMsgs(num: number = 20) {
    this.messages = this.msgService.readMessages();
  }

  ngOnInit() {
  }

}
