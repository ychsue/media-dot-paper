import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MessageComponent } from './message/message.component';
import { MessageService } from './services/message.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatBottomSheetModule, MatBadgeModule, MatIconModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent
  ],
  entryComponents: [MessageComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatBadgeModule,
    MatIconModule,
    MatBottomSheetModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
