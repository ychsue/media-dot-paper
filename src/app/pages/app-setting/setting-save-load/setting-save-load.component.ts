import { Component, OnInit } from '@angular/core';
import { Gv2googleService } from 'src/app/services/GV/gv2google.service';

@Component({
  selector: 'app-setting-save-load',
  templateUrl: './setting-save-load.component.html',
  styleUrls: ['./setting-save-load.component.css']
})
export class SettingSaveLoadComponent implements OnInit {

  constructor(
    private gvGoogleService: Gv2googleService,
  ) { }

  ngOnInit(): void {
  }

  async onExport() {
    const gvGService = this.gvGoogleService;
    await gvGService.exportGV2GoogleAsync({
      scopes: gvGService.gapiService.scopesForSettings,
    });
  }

  async onImport() {
    const gvGService = this.gvGoogleService;
    await gvGService.importGVFromGoogleAsync({
      scopes: gvGService.gapiService.scopesForSettings,
    });
  }
}
