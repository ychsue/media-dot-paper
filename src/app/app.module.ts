import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MessageComponent } from './message/message.component';
import { MessageService } from './services/message.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatBottomSheetModule, MatBadgeModule, MatIconModule} from '@angular/material';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { TestComponent } from './pages/test/test.component';
import { SafePipe } from './pipes/safe.pipe';
import { MediaEditComponent } from './pages/media-edit/media-edit.component';
import { MeMainDashboardComponent } from './components/me-main-dashboard/me-main-dashboard.component';
import { MeSectionDashboardComponent } from './components/me-section-dashboard/me-section-dashboard.component';
import { MeManiPlateComponent } from './components/me-mani-plate/me-mani-plate.component';
import { PlayerComponent } from './components/player/player.component';
import { MediaEditService } from './services/media-edit.service';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    NavbarComponent,
    HomeComponent,
    TestComponent,
    SafePipe,
    MediaEditComponent,
    MeMainDashboardComponent,
    MeSectionDashboardComponent,
    MeManiPlateComponent,
    PlayerComponent
  ],
  entryComponents: [MessageComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatBadgeModule,
    MatIconModule,
    MatBottomSheetModule,
    AppRoutingModule
  ],
  providers: [MessageService, MediaEditService],
  bootstrap: [AppComponent]
})
export class AppModule { }
