import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from "../../message.service";

export interface IWithClickView {
  title: string;
  content: string;
  stYes: string;
  stNo: string;
}

export interface IWithClickData extends IWithClickView {
  func: (_: any) => any;
  args: any;
}

@Component({
  selector: "app-with-click",
  templateUrl: "./with-click.component.html",
  styleUrls: ["./with-click.component.css"],
})
export class WithClickComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<WithClickComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IWithClickData,
    public msgService: MessageService
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onYesClick() {
    const self = this;
    var res: any;
    try {
      res = await self.data.func(this.data.args);
    } catch (error) {
      self.msgService.alert(error.message);
      console.error(error);
    }
    self.dialogRef.close(res);
  }
}
