import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PageTextsService } from '../services/page-texts.service';
import { concat } from 'rxjs/operators';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  dialogType = DialogType;

  pts: IDialogComp;

  constructor(public ptsService: PageTextsService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    const self = this;
    self.ptsService.PTSReady$.pipe(concat(self.ptsService.ptsLoaded$)).subscribe(_ => {
      self.pts = self.ptsService.pts.dialogComp;
    });
  }

  onLoadURL() {
    this.dialogRef.close(this.data.url);
  }
}

export enum DialogType {
  inputUrl = 0
}

export interface DialogData {
  dType: DialogType;
  url: string;
}
