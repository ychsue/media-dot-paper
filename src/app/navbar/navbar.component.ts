import { Component, OnInit, NgZone, Output } from '@angular/core';
import { MessageService } from '../services/message.service';
import { MatBottomSheet } from '@angular/material';
import { MessageComponent } from '../message/message.component';
import { DbService } from '../services/db.service';
import { MediaEditService, SideClickType } from '../services/media-edit.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() sideType: sideNavType = sideNavType.home;
  @Output() _sideNavType = sideNavType;

  nUnReadMsg = 0;
  sideClickType_ = SideClickType;

  constructor(private bottomSheet: MatBottomSheet , private ngZone: NgZone,
    private db: DbService, public meService: MediaEditService,
    public msgService: MessageService) {
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

  async onSaveStory() {
    const story = this.meService.story;
    delete story['id'];
    const insert = await this.db.upsertAsync(DbService.storyTableName, story);
    // * [2018-07-25 19:04] Change its state to 'Update'
    story['id'] = insert[0].affectedRows[0].id;
    this.meService.sideClickType = SideClickType.select;
  }

  async onUpdateStory() {
    const story = this.meService.story;
    await this.db.upsertAsync(DbService.storyTableName, story);
  }
}

export enum sideNavType {
  none,
  home
}
