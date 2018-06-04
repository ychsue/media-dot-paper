import { Component, OnInit, NgZone } from '@angular/core';
import { MessageService } from '../services/message.service';
import { MatBottomSheet } from '@angular/material';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  nUnReadMsg = 0;
  constructor(private bottomSheet: MatBottomSheet , public msgService: MessageService) {
    this.nUnReadMsg = msgService.getNUnRead();
    msgService.remindMsgIn.subscribe(
      (n) => {
          this.nUnReadMsg = n;
      });
  }

  ngOnInit() {
  }

  showMsgsAtBottom() {
    const ref = this.bottomSheet.open(MessageComponent);
    ref.instance.showMsgs();
  }
}
