import { Injectable } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";
import { MatSnackBar } from "@angular/material/snack-bar";
import { timer } from "rxjs";

// Gotten from https://www.digitalocean.com/community/tutorials/angular-service-worker-updates
@Injectable({
  providedIn: "root",
})
export class MySwUpdateService {

  times =0;

  constructor(public swUpdate: SwUpdate, private snackbar: MatSnackBar) {
    const self = this;
    (window as any).swUpdate = self.swUpdate; //DEBUG

    self.swUpdate.available.subscribe((evt) => {
      const snack = self.snackbar.open("Update Available", "Reload");
      snack.onAction().subscribe(() => {
        window.location.reload();
      });
      setTimeout(() => {
        snack.dismiss();
      }, 6000);
    });
  }

  async checkForUpdateAsync(sec: number) {
    const self = this;
    if (self.times >= 5) {
      console.log('Service Worker Problem: checkForUpdateAsync');
      return;
    }

    if(self.swUpdate.isEnabled) {
      await self.swUpdate.checkForUpdate();
    } else {
      await timer(sec*1000).toPromise();
      self.times++;
      await self.checkForUpdateAsync(sec);      
    }
  }
}
