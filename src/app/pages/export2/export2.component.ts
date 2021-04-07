import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatAnchor } from "@angular/material/button/button";
import { Subject } from "rxjs";
import { Subscription } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { DeviceService } from "src/app/services/device.service";
import { GapiService } from "src/app/services/GAPI/gapi.service";
import { MediaEditService } from "src/app/services/media-edit.service";
import { MessageService } from "src/app/services/message.service";
import { PlayerType } from "src/app/vm/player-type.enum";

@Component({
  selector: "app-export2",
  templateUrl: "./export2.component.html",
  styleUrls: ["./export2.component.css"],
})
export class Export2Component implements OnInit, OnDestroy {
  name: string;
  img: string;

  private _unsubscribed = new Subject<boolean>();

  constructor(public GAPIservice: GapiService, public device: DeviceService) {}

  ngOnDestroy(): void {
    this._unsubscribed.next(true);
    this._unsubscribed.complete();
    this._unsubscribed = null;
  }

  ngOnInit(): void {
    this.GAPIservice.service.userProfile$
      .pipe(takeUntil(this._unsubscribed))
      .subscribe((profile) => {
        this.name = profile.name;
        this.img = profile.img;
      });
  }

  onClick() {
    this.GAPIservice.service.signInAsync().then((usr) => {
      console.log(usr);
    });
  }
}
