import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MessageComponent } from './message/message.component';
import { MessageService } from './services/message.service';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatBottomSheetModule, MatBadgeModule, MatIconModule,
  MatFormFieldModule, MatInputModule, MatListModule, MatDialogModule,
  MatSidenavModule, MatSliderModule, MatTabsModule, MatMenuModule,
  MatTooltipModule, MatSelectModule, MatSlideToggleModule, MatExpansionModule, MatProgressSpinnerModule} from '@angular/material';
import { NavbarComponent } from './navbar/navbar.component';
// import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { TestComponent } from './pages/test/test.component';
import { SafePipe, SafeHtmlPipe } from './pipes/safe.pipe';
import { MediaEditComponent } from './pages/media-edit/media-edit.component';
import { MeMainDashboardComponent } from './components/me-main-dashboard/me-main-dashboard.component';
import { MeSectionDashboardComponent } from './components/me-section-dashboard/me-section-dashboard.component';
import { MeManiPlateComponent } from './components/me-mani-plate/me-mani-plate.component';
import { PlayerComponent } from './components/player/player.component';
import { MediaEditService } from './services/media-edit.service';
import { YoutubeService } from './services/youtube.service';
import { GvService } from './services/gv.service';
import { DialogComponent } from './dialog/dialog.component';
import { FormsModule } from '@angular/forms';
import { DbService } from './services/db.service';
import { DeviceService } from './services/device.service';
import { DraglistComponent } from './components/draglist/draglist.component';
import { SwapIconComponent } from './components/swap-icon/swap-icon.component';
import { CommonModule } from '../../node_modules/@angular/common';
import { StoryComponent } from './pages/story/story.component';
import { FsService } from './services/fs.service';
import { ClipboardService } from './services/clipboard.service';
import { PageTextsService } from './services/page-texts.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AdService } from './services/ad.service';
import { SpeechSynthesisService } from './services/speech-synthesis.service';
import { SetSpeechSynthesisComponent } from './components/set-speech-synthesis/set-speech-synthesis.component';
import { CrossCompService } from './services/cross-comp.service';
import { MdpsListComponent } from './components/mdps-list/mdps-list.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { StoryService } from './services/story.service';
import { StoryGsettingPlateComponent } from './components/story-gsetting-plate/story-gsetting-plate.component';
import { SettingMediaComponent } from './components/setting-media/setting-media.component';
import { InProgressComponent } from './components/in-progress/in-progress.component';
import { SbvService } from './services/sbv.service';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    NavbarComponent,
    HomeComponent,
    TestComponent,
    SafePipe,
    SafeHtmlPipe,
    MediaEditComponent,
    MeMainDashboardComponent,
    MeSectionDashboardComponent,
    MeManiPlateComponent,
    PlayerComponent,
    DialogComponent,
    DraglistComponent,
    SwapIconComponent,
    StoryComponent,
    SetSpeechSynthesisComponent,
    MdpsListComponent,
    WelcomeComponent,
    StoryGsettingPlateComponent,
    SettingMediaComponent,
    InProgressComponent
  ],
  entryComponents: [MessageComponent, DialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    // BrowserAnimationsModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatBadgeModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    MatFormFieldModule,
    MatBottomSheetModule,
    MatListModule,
    MatDialogModule,
    CommonModule,
    MatSliderModule,
    MatTabsModule,
    MatTooltipModule,
    HttpClientModule,
    MatMenuModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatProgressSpinnerModule
  ],
  providers: [MessageService, MediaEditService, YoutubeService, GvService, DbService, DeviceService
    , FsService, ClipboardService, PageTextsService, AdService, SpeechSynthesisService, CrossCompService,
    StoryService, SbvService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
