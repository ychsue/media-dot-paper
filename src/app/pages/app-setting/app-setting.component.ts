import { Component, OnInit } from '@angular/core';
import { PageTextsService } from 'src/app/services/page-texts.service';
import { concat } from 'rxjs/operators';
import { GvService, ParaInLS } from 'src/app/services/gv.service';

@Component({
  selector: 'app-app-setting',
  templateUrl: './app-setting.component.html',
  styleUrls: ['./app-setting.component.css', '../../common-use.css']
})
export class AppSettingComponent implements OnInit {

  pts: IAppSettingPage;
  constructor(public gv: GvService, private ptsService: PageTextsService) {
    const self = this;
    ptsService.PTSReady$.pipe(concat(ptsService.ptsLoaded$)).subscribe(_ => {
      if (!!ptsService.pts && !!ptsService.pts.appSettingPage) {
        self.pts = ptsService.pts.appSettingPage;
      }
    });
  }

  ngOnInit() {
  }

  onSaveZoom() {
    this.gv.saveToLocalStorage(ParaInLS.zoomAll);
  }
}
