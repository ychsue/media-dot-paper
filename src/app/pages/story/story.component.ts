import { Component, OnInit } from '@angular/core';
import { MediaEditService } from '../../services/media-edit.service';
import { MatAnchor } from '@angular/material';
import { send } from 'q';
import { DomSanitizer } from '@angular/platform-browser';
import { PlayerType } from '../../vm/player-type.enum';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  downloadHref: string;
  constructor(public meService: MediaEditService) { }

  ngOnInit() {
  }

  onExportStory(sender: MatAnchor, e: MouseEvent) {
    const self = this;
    const a = sender._elementRef.nativeElement as HTMLAnchorElement;
    if (e.x === 0) {
      // URL.revokeObjectURL(self.downloadHref);
      return;
    } else {
      e.preventDefault();
      if (self.meService.story.meType === PlayerType.file) {
        alert('抱歉，由於想匯出的媒體為local的檔案，這表示此檔案也要一同匯出才行。此版本尚未將此功能建構進來，敬請諒解。');
        return;
      }
      const blob = new Blob([JSON.stringify(self.meService.story)], {type: 'application/json'});
      this.downloadHref = URL.createObjectURL(blob);
      // this.downloadHref = "data:text/json;charset=utf-8," + encodeURI(JSON.stringify(this.meService.story));
      setTimeout(_ => a.click());
      // a.click();
    }
  }
}
