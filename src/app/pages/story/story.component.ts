import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaEditService } from '../../services/media-edit.service';
import { MatAnchor } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { send } from 'q';
import { DomSanitizer } from '@angular/platform-browser';
import { PlayerType } from '../../vm/player-type.enum';
import { StoryService } from '../../services/story.service';
import { PageTextsService } from '../../services/page-texts.service';
import { concat, delay, first, debounce, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { FsService } from '../../services/fs.service';
import { MessageService } from '../../services/message.service';
import { utterType } from 'src/app/vm/story-g-setting';
import { SbvService } from 'src/app/services/sbv.service';
import { DialogComponent, DialogType } from 'src/app/dialog/dialog.component';
import { StringHelper } from 'src/app/extends/string-helper';
import { DeviceService } from 'src/app/services/device.service';
import { TextInputAgentService } from 'src/app/services/TextInputAgent/text-input-agent.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css', '../../common-use.css']
})
export class StoryComponent implements OnInit, OnDestroy {

  utterType = utterType;

  downloadHref: string;
  downloadSBVHref: string;

  onDescChanged$ = new Subject<string>();
  readonly _unsubscribe = new Subject<boolean>();

  pts: IStoryComp;

  constructor(public meService: MediaEditService,
    public ptsService: PageTextsService,
    public msg: MessageService,
    private fs: FsService,
    private cdr: ChangeDetectorRef,
    private storyService: StoryService,
    private sbvService: SbvService,
    public dialog: MatDialog,
    private TIAService: TextInputAgentService
  ) {
  }
  ngOnDestroy(): void {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }

  ngOnInit() {
    const self = this;
    self.ptsService.PTSReady$.pipe(concat(self.ptsService.ptsLoaded$), takeUntil(self._unsubscribe)).subscribe(_ => {
      self.pts = self.ptsService.pts.storyComp;
      self.cdr.detectChanges();
    });
    self.onDescChanged$.pipe(debounceTime(1000), distinctUntilChanged(), takeUntil(self._unsubscribe))
      .subscribe(st => {
        self.meService.updateLinks();
      });
  }

  onExportStory(sender: MatAnchor, e: MouseEvent) {
    const self = this;
    const a = sender._elementRef.nativeElement as HTMLAnchorElement;
    if (self.meService.story.meType === PlayerType.file) {
      e.preventDefault();
      self.msg.alert((!!self.pts) ? self.pts.notYetFileExport : '抱歉，由於想匯出的媒體為local的檔案，這表示此檔案也要一同匯出才行。此版本尚未將此功能建構進來，敬請諒解。');
      return;
    }

    // * [2018-09-04 12:06] Start to store into the file
    if (!!window.cordova === true) {
      e.preventDefault();
      self.fs.saveTxtFile$$(self.storyService.stringifyAStory(self.meService.story), Math.round(self.meService.story.viewTime / 1000)
        // + self.meService.story.name.replace(/\/|\:/g, '_') + '.json');
        + StringHelper.toFileName(self.meService.story.name) + '.mdpyc');
    } else {
      let blob: Blob;
      // blob = new Blob([JSON.stringify(self.meService.story)], {type: 'application/json'});
      // if (!!window.cordova && cordova.platformId === 'android') {
      blob = new Blob([self.storyService.stringifyAStory(self.meService.story)],
        <any>{ encoding: 'UTF-8', type: 'text/plain;charset=UTF-8' });
      // }
      this.downloadHref = URL.createObjectURL(blob);
      // this.downloadHref = "data:text/json;charset=utf-8," + encodeURI(JSON.stringify(this.meService.story));
    }
  }

  async onExportSBV(sender: HTMLAnchorElement) {
    const self = this;
    const dialogRef = self.dialog.open(DialogComponent, {
      width: '50%',
      data: {
        dType: DialogType.inputNum, msg:
          (!!self.pts) ? self.pts.sbvShiftT : "若想平移時間，請輸入秒數", number: 0
      }
    });
    const shiftT = await dialogRef.afterClosed().pipe(first()).toPromise();
    // * [2018-09-04 11:59] The part to translate into .SBV
    const input = self.sbvService.getSbvStringFromStory(
      self.meService.story, shiftT);
    // * [2018-09-04 12:00] The part to store the .SBV file
    if (!!window.cordova === true) {
      self.fs.saveTxtFile$$(input,
        // self.meService.story.name.replace(/\/|\:/g, '_') + '.sbv');
        StringHelper.toFileName(self.meService.story.name) + '.sbv');
    } else {
      let blob: Blob;
      // blob = new Blob([input], {type: 'text/plain'});
      // if (!!window.cordova && cordova.platformId === 'android') {
      blob = new Blob([input], <any>{ encoding: 'UTF-8', type: 'text/plain;charset=UTF-8' });
      // }
      this.downloadSBVHref = URL.createObjectURL(blob);
      setTimeout(() => { // wait until downloadSBVHref has been really updated.
        sender.click();
      }, 0);
    }
  }

  onDescClick(e: MouseEvent) {
    const self = this;
    self.TIAService.subscribeWithInit({
      work: (st: string) => {
        self.onDescChanged$.next(st);
        self.meService.story.description = st;
      },
      initSt: self.meService.story.description,
      returnWork: () => {
        (e.target as HTMLTextAreaElement).blur();
      }
    });
  }
}
