import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaEditService } from '../../services/media-edit.service';
import { MatAnchor } from '@angular/material';
import { send } from 'q';
import { DomSanitizer } from '@angular/platform-browser';
import { PlayerType } from '../../vm/player-type.enum';
import { utterType, IStory } from '../../services/story.service';
import { PageTextsService } from '../../services/page-texts.service';
import { concat } from 'rxjs/operators';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  utterType = utterType;

  downloadHref: string;
  downloadSBVHref: string;

  pts: IStoryComp;

  constructor(public meService: MediaEditService,
  public ptsService: PageTextsService,
  private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    const self = this;
    self.ptsService.PTSReady$.pipe(concat(self.ptsService.ptsLoaded$)).subscribe(_ => {
      self.pts = self.ptsService.pts.storyComp;
      self.cdr.detectChanges();
    });
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
        alert((!!self.pts) ? self.pts.notYetFileExport : '抱歉，由於想匯出的媒體為local的檔案，這表示此檔案也要一同匯出才行。此版本尚未將此功能建構進來，敬請諒解。');
        return;
      }
      const blob = new Blob([JSON.stringify(self.meService.story)], {type: 'application/json'});
      this.downloadHref = URL.createObjectURL(blob);
      // this.downloadHref = "data:text/json;charset=utf-8," + encodeURI(JSON.stringify(this.meService.story));
      setTimeout(_ => a.click());
      // a.click();
    }
  }

  onExportSBV(sender: MatAnchor, e: MouseEvent) {
    const self = this;
    const a = sender._elementRef.nativeElement as HTMLAnchorElement;
    if (e.x === 0) {
      return;
    } else {
      e.preventDefault();
      const getTime = (t: number) => {
        let st = '';
        let buf = Math.floor(t);
        // * [2018-08-27 15:29] Get minisecond
        st = ('000' + Math.round((t - buf) * 1000)).slice(-3);
        st = '.' + st;
        // * [2018-08-27 15:34] Get second
        t = buf;
        buf = t % 60;
        st = ('00' + buf).slice(-2) + st;
        st = ':' + st;
        // * [2018-08-27 15:38] Get minute
        t = (t - buf) / 60;
        buf = t % 60;
        st = ('00' + buf).slice(-2) + st;
        st = ':' + st;
        // * [2018-08-27 15:38] Get hour
        t = (t - buf) / 60;
        buf = t;
        st = buf + st;
        // * [2018-08-27 15:42] Return the string
        return st;
      };

      const frames = self.meService.story.frames.slice(0).sort( (p, b) => {
        return p.start - b.start;
      });
      const input = frames.reduce((pre, cur) => {
        let st = (!!pre) ? '\n\n' : '';
        st += getTime(cur.start) + ',' + getTime(cur.end) + '\n';
        st += cur.utterPara.text;
        return pre + st;
      }, '');
      const blob = new Blob([input], {type: 'text/plain'});
      this.downloadSBVHref = URL.createObjectURL(blob);
      setTimeout(_ => a.click());
      // a.click();
    }
  }
}
