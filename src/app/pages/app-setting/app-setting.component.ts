import { Component, OnInit } from '@angular/core';
import { PageTextsService } from 'src/app/services/page-texts.service';
import { concat } from 'rxjs/operators';

@Component({
  selector: 'app-app-setting',
  templateUrl: './app-setting.component.html',
  styleUrls: ['./app-setting.component.css']
})
export class AppSettingComponent implements OnInit {

  pts: IAppSettingPage;
  constructor(private ptsService: PageTextsService) { 
    const self = this;
    ptsService.PTSReady$.pipe(concat(ptsService.ptsLoaded$)).subscribe(_ => {
      if (!!ptsService.pts && !!ptsService.pts.appSettingPage) {
        self.pts = ptsService.pts.appSettingPage;
      }
    });
  }

  ngOnInit() {
  }

}
