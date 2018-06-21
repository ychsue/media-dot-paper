import { Component, AfterViewInit } from '@angular/core';
import { MessageService, MessageTypes } from './services/message.service';
import { MatBottomSheet } from '@angular/material';
import { MessageComponent } from 'cordova-test/platforms/windows/src/app/message/message.component';
import { YoutubeService } from 'src/app/services/youtube.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  // title = window['cordova'].platformId;
  title = 'Angular';

  constructor(public msgService: MessageService, private ytService: YoutubeService) {
    msgService.pushMessage({type: MessageTypes.Error, message: 'Test 1' });
    msgService.pushMessage({type: MessageTypes.Warn, message: 'Test 2' });
    msgService.pushMessage({type: MessageTypes.Info, message: 'Test 321' });
  }

  ngAfterViewInit() {
    this.ytService.embedApiScript();
  }
}
