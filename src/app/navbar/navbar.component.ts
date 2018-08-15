import { Component, OnInit, NgZone, Output, EventEmitter } from '@angular/core';
import { MessageService, MessageTypes } from '../services/message.service';
import { MatBottomSheet } from '@angular/material';
import { MessageComponent } from '../message/message.component';
import { DbService } from '../services/db.service';
import { MediaEditService, SideClickType } from '../services/media-edit.service';
import { PlayerType } from '../vm/player-type.enum';
import { FsService } from '../services/fs.service';
import { map, concatAll } from '../../../node_modules/rxjs/operators';
import { PageTextsService } from '../services/page-texts.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() toggleSidenav_Click = new EventEmitter<MouseEvent>();

  nUnReadMsg = 0;
  sideClickType_ = SideClickType;

  constructor(private bottomSheet: MatBottomSheet , private ngZone: NgZone,
    private db: DbService, private fsService: FsService, public meService: MediaEditService,
    public msgService: MessageService, public ptsService: PageTextsService) {
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
    const self = this;
    if (story.meType === PlayerType.file) {
      const isSaved = await this.fsService.getFile$(story.fileName, true).pipe(map(fEntry => {
        return self.fsService.writeFile$(fEntry, self.meService.blob);
      }), concatAll()).toPromise();
      // * [2018-08-05 17:23] if it is saved, renew its URL
      if (isSaved === true) {
        story.urlOrID = (await this.fsService.getFile$(story.fileName).toPromise()).toURL();
      }

      self.msgService.pushMessage({type: MessageTypes.Info, message: `The file ${story.fileName} is stored: ${isSaved}`});
    }
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
