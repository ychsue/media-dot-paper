import { Injectable } from '@angular/core';
import { merge } from "rxjs";
import { filter, take } from "rxjs/operators";
import confirmAsync from "src/app/extends/confirmAsync";
import { GapiService } from '../GAPI/gapi.service';
import { MessageService } from "../message.service";
import { PageTextsService } from "../page-texts.service";
import { WithClickService } from "../WithClick/with-click.service";
import exportGV2GoogleAsync from './exportGV2GoogleAsync';
import getExport2GDFolderIdAsync from "./functions/getExport2GDFolderIdAsync";
import setExport2GDFolderIdAsync from "./functions/setExport2GDFolderIdAsync";
import { GvService, ParaInLS } from "./gv.service";
import importGVFromGoogleAsync from './importGVFromGoogleAsync';

@Injectable({
  providedIn: "root",
})
export class Gv2googleService {
  isIOGVGoogle: boolean = false;

  pts: IGv2googleService = null;
  constructor(
    public gapiService: GapiService,
    public gvService: GvService,
    public withClickService: WithClickService,
    private ptsService: PageTextsService,
    public msgService: MessageService
  ) {
    const self = this;

    merge(self.ptsService.PTSReady$, self.ptsService.ptsLoaded$).subscribe(
      (_) => {
        self.pts = self.ptsService.pts.gv2googleService;
      }
    );

    gapiService.service.isAuthLoaded$
      .pipe(
        filter((x) => x),
        take(1)
      )
      .subscribe((_) => {
        // * [2021-05-15 10:48] Once the user is changed, import settings from Google if possible
        const auth = self.gapiService.service.getAuthInstance();
        auth.currentUser.listen(async (usr) => {
          if (!!usr && auth.isSignedIn.get()) {
            // ** [2021-05-15 10:52] Check whether the user want to import settings from google
            self.gvService.loadFromLocalStorage(ParaInLS.googleUsers);
            const uName = usr.getBasicProfile().getName();
            const uId = usr.getBasicProfile().getId();
            let gUser = self.gvService.googleUsers.find((x) => x.id === uId);
            if (gUser?.allowSet === "No") return;
            // ** [2021-05-15 11:10] Check whether the user want to import settings from google
            if (gUser?.allowSet !== "Yes") {
              const isAllowed = await confirmAsync(
                !!self.pts
                  ? this.pts.confirmExset2GD
                  : "要將設定存到Google Drive上嗎？"
              ); //I18N
              if (!!!gUser) {
                gUser = {
                  name: uName,
                  id: uId,
                  allowSet: isAllowed ? "Yes" : "No",
                  setFId: "",
                };
                self.gvService.googleUsers.push(gUser);
              } else {
                gUser.allowSet = isAllowed ? "Yes" : "No";
              }
              self.gvService.saveToLocalStorage(ParaInLS.googleUsers);
              if (isAllowed === false) {
                return;
              }
            }

            if (self.isIOGVGoogle === false) {
              self.importGVFromGoogleAsync({
                signInWithClick:
                  self.withClickService.withImportGVFromGoogleClick,
                grantWithClick:
                  self.withClickService.withImportGVFromGoogleClick,
                scopes: self.gapiService.scopesForSettings,
              });
            }
          }
        });
        // self.gapiService.service.getAuthInstance().isSignedIn.listen((isIn) => {
        //   if (isIn) self.importGVFromGoogleAsync({});
        // });
      });
  }

  importGVFromGoogleAsync: typeof importGVFromGoogleAsync =
    importGVFromGoogleAsync.bind(this);
  exportGV2GoogleAsync: typeof exportGV2GoogleAsync =
    exportGV2GoogleAsync.bind(this);
  getExport2GDFolderIdAsync: typeof getExport2GDFolderIdAsync =
    getExport2GDFolderIdAsync.bind(this);
  setExport2GDFolderIdAsync: typeof setExport2GDFolderIdAsync =
    setExport2GDFolderIdAsync.bind(this);
}
