import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IMyCaptionTrack } from "src/app/services/YouTube/typeDefs";

@Component({
  selector: "app-sel-youtube-caption-dialog",
  templateUrl: "./sel-youtube-caption-dialog.component.html",
  styleUrls: [
    "./sel-youtube-caption-dialog.component.css",
    "../../common-use.css",
  ],
})
export class SelYoutubeCaptionDialogComponent implements OnInit {
  track: IMyCaptionTrack;
  constructor(
    public dialogRef: MatDialogRef<SelYoutubeCaptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IMyCaptionTrack[]
  ) {}

  ngOnInit(): void {}

  onSelect() {
    this.dialogRef.close(this.track);
  }
}
