import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DailySample } from 'src/app/vm/daily-sample';
import { DialogComponent, DialogData, DialogType } from 'src/app/dialog/dialog.component';
import { first ,  concat } from 'rxjs/operators';
import { DailySampleService } from 'src/app/services/daily-sample.service';
import { PageTextsService } from 'src/app/services/page-texts.service';

@Component({
  selector: 'app-daily-sample',
  templateUrl: './daily-sample.component.html',
  styleUrls: ['./daily-sample.component.css', '../../common-use.css']
})
export class DailySampleComponent implements OnInit {

  eDSAction = enumDSAction;

  pts: IDailySampleComp;

  constructor(public dialog: MatDialog, public dsService: DailySampleService, private ptsService: PageTextsService) {
    const self = this;
    ptsService.PTSReady$.pipe(concat(ptsService.ptsLoaded$)).subscribe(_ => {
      if (!!ptsService.pts && !!ptsService.pts.dailySampleComp) {
        self.pts = ptsService.pts.dailySampleComp;
        dsService.defaultDS1.name = self.pts.defName;
      }
    });
  }

  ngOnInit() {
  }

  onCustonDSAction(action: enumDSAction, dSItem: DailySample = null) {
    const self = this;
    let data: DailySample = new DailySample();
    // * [2018-12-18 22:26] Load daily sample or finish the job of delete
    switch (action) {
      case enumDSAction.delete:
        self.dsService.delete(dSItem);
        return;
      case enumDSAction.add:
        break;
      case enumDSAction.edit:
        data = Object.assign(data, dSItem);
        break;
      default:
        break;
    }
    // * [2018-12-18 22:27] Open the dialog and get the result
    const dialogRef = self.dialog.open(DialogComponent, {
      data: {dType: DialogType.dailySample, data: data}
    });
    dialogRef.afterClosed().pipe(first()).subscribe(dS => {
      if (!!dS) {
        if (action === enumDSAction.add) {
          self.dsService.add(dS);
        } else if (action === enumDSAction.edit) {
          self.dsService.edit(dS);
        }
      }
    });
  }

  onSelDS(ds: DailySample) {
    this.dsService.currentDS = ds;
  }
}

enum enumDSAction {
  add,
  delete,
  edit
}
