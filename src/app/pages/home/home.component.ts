import { Component, OnInit } from '@angular/core';
import { GvService, PageType } from 'src/app/services/gv.service';
import { MediaEditService } from 'src/app/services/media-edit.service';
import { MatDialog } from '@angular/material';
import { DialogComponent, DialogType } from 'src/app/dialog/dialog.component';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Url = 'https://dzxuyknqkmi1e.cloudfront.net/odb/2018/06/odb-06-12-18.mp3';
  testYoutubeUrl = 'https://youtu.be/f1SZ5GaAp3g';

  pageType = PageType;
  constructor(public gv: GvService, public dialog: MatDialog,
    private meService: MediaEditService, private db: DbService) { }

  ngOnInit() {
  }

  onFileSelect(files: FileList) {
    if (files !== null && files.length > 0) {
      const file = files[0];
      this.meService.initMe(file);
      this.gv.shownPage = PageType.MediaEdit;
    }
  }

  onLoadFromURL() {
    const self = this;
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '50%',
      data: {dType: DialogType.inputUrl, url: self.Url}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result === false) {return; }
      self.Url = result;
      this.meService.initMe(self.Url);
      this.gv.shownPage = PageType.MediaEdit;
    });
  }
}
