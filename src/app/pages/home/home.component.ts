import { Component, OnInit } from '@angular/core';
import { GvService, PageType } from 'src/app/services/gv.service';
import { MediaEditService } from 'src/app/services/media-edit.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  testUrl = 'https://dzxuyknqkmi1e.cloudfront.net/odb/2018/06/odb-06-12-18.mp3';
  testYoutubeUrl = 'https://youtu.be/f1SZ5GaAp3g';

  pageType = PageType;
  constructor(public gv: GvService, private meService: MediaEditService) { }

  ngOnInit() {
  }

  onNormalAudio() {
    this.meService.initMe(this.testUrl);
    this.gv.shownPage = PageType.MediaEdit;
  }

  onInputURL(inURL: string) {
    this.meService.initMe(inURL);
    this.gv.shownPage = PageType.MediaEdit;
  }

  onFileSelect(files: FileList) {
    if (files !== null && files.length > 0) {
      const file = files[0];
      this.meService.initMe(file);
      this.gv.shownPage = PageType.MediaEdit;
    }
  }
}
