import { Component, OnInit } from '@angular/core';
import { MediaEditService } from 'src/app/services/media-edit.service';

@Component({
  selector: 'app-setting-media',
  templateUrl: './setting-media.component.html',
  styleUrls: ['./setting-media.component.css']
})
export class SettingMediaComponent implements OnInit {

  constructor(public meService: MediaEditService) { }

  ngOnInit() {
  }

  tickDisplayWith = (meService: MediaEditService) => {
    return (i: number) => {
      return meService.availablePlaybackRates[i];
    };
  }

}
