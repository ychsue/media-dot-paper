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
    if (!!this.downloadSBVHref) URL.revokeObjectURL(this.downloadSBVHref);
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
      onOpened: () => {
        (e.target as HTMLTextAreaElement).blur();
      },
      onClosed: () => {
        const ele = (e.target as HTMLTextAreaElement);
        ele.blur(); //To tell it to hide the keyboard
      }

    });
  }
}
