import { Injectable } from '@angular/core';
import { GapiService } from '../GAPI/gapi.service';
import exportGV2GoogleAsync from './exportGV2GoogleAsync';
import getExport2GDFolderIdAsync from "./functions/getExport2GDFolderIdAsync";
import setExport2GDFolderIdAsync from "./functions/setExport2GDFolderIdAsync";
import { GvService } from './gv.service';
import importGVFromGoogleAsync from './importGVFromGoogleAsync';

@Injectable({
  providedIn: "root",
})
export class Gv2googleService {
  constructor(public gapiService: GapiService, public gvService: GvService) {}

  importGVFromGoogleAsync: typeof importGVFromGoogleAsync =
    importGVFromGoogleAsync.bind(this);
  exportGV2GoogleAsync: typeof exportGV2GoogleAsync =
    exportGV2GoogleAsync.bind(this);
  getExport2GDFolderIdAsync: typeof getExport2GDFolderIdAsync =
    getExport2GDFolderIdAsync.bind(this);
  setExport2GDFolderIdAsync: typeof setExport2GDFolderIdAsync =
    setExport2GDFolderIdAsync.bind(this);
}
