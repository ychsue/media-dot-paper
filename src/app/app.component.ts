import { Component } from '@angular/core';
import { MessageService, MessageTypes } from './services/message.service';
import { MatBottomSheet } from '@angular/material';
import { MessageComponent } from 'cordova-test/platforms/windows/src/app/message/message.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = window['cordova'].platformId;
  title = 'Angular';

  constructor(public msgService: MessageService) {
    msgService.pushMessage({type: MessageTypes.Error, message: 'Test 1' });
    msgService.pushMessage({type: MessageTypes.Warn, message: 'Test 2' });
    msgService.pushMessage({type: MessageTypes.Info, message: 'Test 321' });
  }
}
