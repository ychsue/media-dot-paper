import { Injectable } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";
import { MatSnackBar } from "@angular/material/snack-bar";

// Gotten from https://www.digitalocean.com/community/tutorials/angular-service-worker-updates
@Injectable({
  providedIn: "root",
})
export class MySwUpdateService {
  constructor(private swUpdate: SwUpdate, private snackbar: MatSnackBar) {
    const self = this;
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
}
