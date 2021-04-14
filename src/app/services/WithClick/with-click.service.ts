import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { first } from "rxjs/operators";
import { IWithClickData, IWithClickView, WithClickComponent } from "./with-click/with-click.component";

@Injectable({
  providedIn: "root",
})
export class WithClickService {
  constructor(public dialog: MatDialog) {}

  withClick({title, content, stYes, stNo}:IWithClickView) {
    const self = this;
    return <I, J>(func: (_: I) => Promise<J>) => {
      return async (args: I) => {
        const dialogRef = self.dialog.open(WithClickComponent, {
          width: "50%",
          data: { func, args, title, content, stYes, stNo} as IWithClickData,
        });
        const res: J = await dialogRef.afterClosed().pipe(first()).toPromise();
        return res;
      };
    };
  }
}
