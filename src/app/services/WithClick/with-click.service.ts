import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { merge } from "rxjs";
import { first } from "rxjs/operators";
import { PageTextsService } from "../page-texts.service";
import { IWithClickData, IWithClickView, WithClickComponent } from "./with-click/with-click.component";

@Injectable({
  providedIn: "root",
})
export class WithClickService {
  pts: IWithClickService = null;
  constructor(public dialog: MatDialog, private ptsService: PageTextsService) {
    const self = this;
    merge(self.ptsService.PTSReady$, self.ptsService.ptsLoaded$).subscribe(
      (_) => {
        self.pts = self.ptsService.pts.withClickService;
      }
    );
  }

  withClick({ title, content, stYes, stNo }: IWithClickView) {
    const self = this;
    return <I, J>(func: (_: I) => Promise<J>) => {
      return async (args: I) => {
        const dialogRef = self.dialog.open(WithClickComponent, {
          width: "50%",
          data: { func, args, title, content, stYes, stNo } as IWithClickData,
        });
        const res: J = await dialogRef.afterClosed().pipe(first()).toPromise();
        return res;
      };
    };
  }

  withSignInClick = this.withClick.bind(this)({
    title: !!this.pts ? this.pts.signInTitle : "Google Drive 權限",
    content: !!this.pts
      ? this.pts.signInContent
      : "您需要登入 GOOGLE此動作才能繼續",
    stYes: !!this.pts ? this.pts.yes : "好",
    stNo: !!this.pts ? this.pts.no : "不想",
  });

  withGrantClick = this.withClick.bind(this)({
    title: !!this.pts ? this.pts.grantTitle : "Google Drive 權限",
    content: !!this.pts
      ? this.pts.grantContent
      : "您需要提供 GOOGLE 額外的權限",
    stYes: !!this.pts ? this.pts.yes : "好",
    stNo: !!this.pts ? this.pts.no : "不想",
  });

  withImportGVFromGoogleClick = this.withClick.bind(this)({
    title: !!this.pts
      ? this.pts.importGVFromGDTitle
      : "需要您同意讀寫您的 Google Drive",
    content: !!this.pts
      ? this.pts.importGVFromGDContent
      : "為了能跨平台跨APP，本APP目前選擇在Google Drive上放置設定檔，",
    stYes: !!this.pts ? this.pts.yes : "好",
    stNo: !!this.pts ? this.pts.no : "不了",
  });
}
