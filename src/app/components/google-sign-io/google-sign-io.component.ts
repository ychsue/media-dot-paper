import { AfterViewInit, Component, NgZone, OnInit } from "@angular/core";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { Console } from "console";
import { EventEmitter } from "events";
import { merge, timer } from "rxjs";
import { filter, take } from "rxjs/operators";
import { GapiService } from "src/app/services/GAPI/gapi.service";
import { GvService, ParaInLS } from "src/app/services/GV/gv.service";
import { PageTextsService } from "src/app/services/page-texts.service";

@Component({
  selector: "app-google-sign-io",
  templateUrl: "./google-sign-io.component.html",
  styleUrls: ["./google-sign-io.component.css"],
})
export class GoogleSignIoComponent implements OnInit, AfterViewInit {
  imgUrl: string;
  name: string;
  id: string;
  scopes: Array<string> = [];

  pts: IGoogleSignIOComp = null;
  constructor(
    private gapiService: GapiService,
    private ngZone: NgZone,
    private ptsService: PageTextsService,
    public gvService: GvService
  ) {}
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    const self = this;
    merge(self.ptsService.PTSReady$, self.ptsService.ptsLoaded$).subscribe(
      (_) => {
        self.pts = self.ptsService.pts?.googleSignIOComp;
      }
    );

    self.gapiService.service
      .signIn2Async("g-signin2")
      .then((usr) => {
        self.ngZone.run((_) => {
          const profile = usr.getBasicProfile();
          self.imgUrl = profile.getImageUrl();
          self.name = profile.getName();
          self.id = profile.getId();
        });
      })
      .catch((reason) => {
        console.log(reason);
      });

    self.gapiService.service.userProfile$.subscribe((usr) => {
      self.id = usr?.id;
      self.imgUrl = usr?.img;
      self.name = usr?.name;
      self.scopes = usr.user?.getGrantedScopes()?.split(" ");
      self.gvService.currentGoogleUser = self.gvService.googleUsers.find(
        (x) => x.id === self.id
      );
    });
  }

  signOutClick() {
    this.gapiService.service.getAuthInstance().currentUser.get().disconnect();
  }

  onShareToggle(ev: MatSlideToggleChange) {
    const self = this;
    const allowSet: typeof self.gvService.currentGoogleUser.allowSet =
      ev.checked ? "Yes" : "No";
    const currentGoogleUser = self.gvService.currentGoogleUser;
    if (!!!currentGoogleUser) {
      console.log(
        "google-sign-io.component::onShareToggle: No currentGoogleUser"
      );
      return;
    }
    // Update allowSet
    currentGoogleUser.allowSet = allowSet;
    const gUser = self.gvService.googleUsers.find(
      (x) => x.id === currentGoogleUser.id
    );
    if (!!!gUser) {
      console.log("google-sign-io.component::onShareToggle: No matched gUser?");
      return;
    }
    gUser.allowSet = allowSet;
    self.gvService.saveToLocalStorage(ParaInLS.googleUsers);
  }
}
