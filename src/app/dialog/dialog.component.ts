import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PageTextsService } from '../services/page-texts.service';
import { concat } from 'rxjs/operators';
import { DailySample } from '../vm/daily-sample';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css', '../common-use.css']
})
export class DialogComponent implements OnInit {

  dialogType = DialogType;

  whichOne: SetStartEnd = {start: false, end: false, cTime: 0};

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

  onLoadNumber() {
    const num = Number(this.data.number);
    this.dialogRef.close((Number.isNaN(num)) ? 0 : num);
  }

  onStartOrEnd() {
    const which = Object.assign({}, this.whichOne);
    which.cTime = this.data.number;
    this.dialogRef.close(which);
    this.whichOne.start = false;
    this.whichOne.end = false;
  }

  onDailySampleInput() {
    const dSample: DailySample = this.data.data;
    dSample.createTime = (!!dSample.createTime) ? dSample.createTime : Date.now();
    this.dialogRef.close(dSample);
  }
}

export enum DialogType {
  inputUrl = 0,
  alert = 1,
  inputNum = 2,
  startOrEnd = 3,
  dailySample = 4
}

export interface DialogData {
  dType: DialogType;
  url?: string;
  msg?: string;
  number?: number;
  ith?: number; // startOrEnd
  aRGB?: {a: number, r: number, g: number, b: number};
  startEnd?: [number, number];
  data?: any;
}

export interface SetStartEnd {
  start: boolean;
  end: boolean;
  cTime: number;
}
