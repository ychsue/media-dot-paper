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
  constructor(private bottomSheet: MatBottomSheet , private ngZone: NgZone, public msgService: MessageService) {
    const self = this;
    this.nUnReadMsg = msgService.getNUnRead();
    msgService.remindMsgIn.subscribe(
      (n) => {
        const isInZone = NgZone.isInAngularZone();
        const action = () => { self.nUnReadMsg = n; };
        if (isInZone === false) {
          ngZone.run(action);
        } else {action(); }
      });
  }

  ngOnInit() {
  }

  showMsgsAtBottom() {
    const ref = this.bottomSheet.open(MessageComponent);
    ref.instance.showMsgs();
  }
}
