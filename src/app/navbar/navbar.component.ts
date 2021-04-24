import { Component, OnInit, NgZone, Output, EventEmitter } from '@angular/core';
import { MessageService, MessageTypes } from '../services/message.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MessageComponent } from '../message/message.component';
import { DbService } from '../services/db.service';
import { MediaEditService, SideClickType } from '../services/media-edit.service';
import { PlayerType } from '../vm/player-type.enum';
import { FsService } from '../services/fs.service';
import { map, concatAll } from '../../../node_modules/rxjs/operators';
import { PageTextsService } from '../services/page-texts.service';
import { DeviceService } from '../services/device.service';
import { GvService, PageType } from '../services/GV/gv.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() toggleSidenav_Click = new EventEmitter<MouseEvent>();

  nUnReadMsg = 0;
  sideClickType_ = SideClickType;
  isAllowSide = false;

  PageType = PageType;

  constructor(private bottomSheet: MatBottomSheet, private ngZone: NgZone,
    private db: DbService, private fsService: FsService, private device: DeviceService,
    public meService: MediaEditService, public gv: GvService,
    public msgService: MessageService, public ptsService: PageTextsService) {
    const self = this;
    this.nUnReadMsg = msgService.getNUnRead();
    msgService.remindMsgIn.subscribe(
      (n) => {
        if (msgService.isShown === false) { return; }
        const isInZone = NgZone.isInAngularZone();
        const action = () => { self.nUnReadMsg = n; };
        if (isInZone === false) {
          ngZone.run(action);
        } else { action(); }
      });
    device.onWindowResize$.subscribe(ev => {
      if (ev.type === 'resize') {
        self.prepareLayout(window.innerWidth, window.innerHeight);
      }
    });
  }

  ngOnInit() {
    this.prepareLayout(window.innerWidth, window.innerHeight);
  }

  prepareLayout(width: number, height: number) {
    if (width >= 500) {
      this.isAllowSide = true;
      this.meService.isToShowList = true;
    } else {
      this.isAllowSide = false;
      this.meService.isToShowList = false;
    }
  }

  showMsgsAtBottom() {
    const ref = this.bottomSheet.open(MessageComponent);
    ref.instance.showMsgs();
  }
}
