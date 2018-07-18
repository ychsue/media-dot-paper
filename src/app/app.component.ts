import { Component, AfterViewInit } from '@angular/core';
import { MessageService, MessageTypes } from './services/message.service';
import { MatBottomSheet } from '@angular/material';
import { MessageComponent } from './message/message.component';
import { YoutubeService } from './services/youtube.service';
import { GvService, PageType } from './services/gv.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  // title = window['cordova'].platformId;
  title = 'Angular';
  pageType = PageType;

  constructor(public msgService: MessageService, public gv: GvService , private ytService: YoutubeService) {
    msgService.pushMessage({type: MessageTypes.Error, message: document.location.toString() });
    msgService.pushMessage({type: MessageTypes.Warn, message: 'Test 2' });
    msgService.pushMessage({type: MessageTypes.Info, message: 'Test 321' });
  }

  ngAfterViewInit() {
    this.ytService.embedApiScript();
  }
}
