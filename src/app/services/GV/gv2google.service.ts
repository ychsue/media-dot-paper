import { Injectable } from '@angular/core';
import { GapiService } from '../GAPI/gapi.service';
import exportGV2GoogleAsync from './exportGV2GoogleAsync';
import { GvService } from './gv.service';
import importGVFromGoogleAsync from './importGVFromGoogleAsync';

@Injectable({
  providedIn: 'root'
})
export class Gv2googleService {

  constructor(public gapiService: GapiService, public gvService: GvService) { }

  importGVFromGoogleAsync: typeof importGVFromGoogleAsync = importGVFromGoogleAsync.bind(this);
  exportGV2GoogleAsync: typeof exportGV2GoogleAsync = exportGV2GoogleAsync.bind(this);
}
