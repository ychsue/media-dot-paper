import { Component, OnInit, NgZone, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { GvService, PageType } from '../../services/gv.service';
import { MediaEditService, SideClickType } from '../../services/media-edit.service';
import { MatDialog } from '@angular/material';
import { DialogComponent, DialogType } from '../../dialog/dialog.component';
import { DbService } from '../../services/db.service';
import { Observable, Subject, from } from 'rxjs';
import { StoryService } from '../../services/story.service';
import { map, concatAll, concat, takeUntil } from 'rxjs/operators';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FsService } from '../../services/fs.service';
import { MessageService, MessageTypes } from '../../services/message.service';
import { PlayerType } from '../../vm/player-type.enum';
import { ClipboardService } from '../../services/clipboard.service';
import { PageTextsService } from '../../services/page-texts.service';
import { CrossCompService } from '../../services/cross-comp.service';
import { IStory } from 'src/app/vm/story';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  Url = 'https://dzxuyknqkmi1e.cloudfront.net/odb/2018/06/odb-06-12-18.mp3';
  testYoutubeUrl = 'https://youtu.be/f1SZ5GaAp3g';

  stories$: Observable<IStory[]>;
  stories: IStory[];
  storySearch$ = new Subject<IStory>();

  @ViewChild('listOfStored')
  listStoredRef: ElementRef;

  private _unsubscribed = new Subject<boolean>();

  pts: IHomePage;

  pageType = PageType;
  constructor(public gv: GvService, public dialog: MatDialog, public ptsServic: PageTextsService,
    private meService: MediaEditService, private db: DbService,
    private ngZone: NgZone, private fs: FsService
    , private msg: MessageService, private clipboard: ClipboardService,
    private ccService: CrossCompService, private storyService: StoryService) {
      const self = this;
      ptsServic.PTSReady$.pipe(concat(ptsServic.ptsLoaded$)).pipe(takeUntil(self._unsubscribed)).subscribe(_ => {
        self.pts = ptsServic.pts.homePage;
      });
    }

  ngOnInit() {
    const self = this;
    // from(this.db.searchAsync()).subscribe(this.stories$);
    self.db.onDataChanged.pipe(takeUntil(self._unsubscribed)).subscribe(data => self.storySearch$.next(null));
    self.stories$ = self.storySearch$.pipe(map(val => {
      if (val === null) { return self.db.searchAsync(DbService.storyTableName, null, null, {viewTime: 'desc'}); }
    }),
    concatAll()
    );
    self.stories$.pipe(takeUntil(self._unsubscribed)).subscribe(s => {
      self.ngZone.run(() => {
        self.stories = s;
      });
    });
    // * [2018-08-01 10:27] Check whether FsPlugin is available now
    self.fs.FSReady$.pipe(takeUntil(self._unsubscribed))
    .subscribe(v => self.msg.pushMessage({type: MessageTypes.Info, message: `FSReady = ${v}`}));

    this.ccService.listOfStoredEle = this.listStoredRef.nativeElement;
  }

  ngAfterViewInit() {
    this.storySearch$.next(null); // initialize the search
  }

  ngOnDestroy(): void {
    this._unsubscribed.next(true);
    this._unsubscribed.complete();
    this._unsubscribed = null;
    this.ccService.listOfStoredEle = null;
  }

  onFileSelect(files: FileList) {
    const self = this;
    if (files !== null && files.length > 0) {
      const file = files[0];
      const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
      if (/(video|audio)/.test(file.type) === true) {
        this.meService.initMe(file);
        this.gv.shownPage = PageType.MediaEdit;
      } else if (( ext === '.json') || (ext === '.txt')) {
        const action$$ = new Promise( (res , rej) => {
          const reader = new FileReader();
          reader.onloadend = (e) => {
            let text = '';
            let story: IStory;
            try {
              text = (e.srcElement as any).result;
              story = self.storyService.getAStoryFromString(text);
              if (!!story) {
                res(story);
              } else {
                rej(story);
              }
            } catch (error) {
              rej(error);
            }
          };
          reader.onerror = rej;
          reader.readAsText(file);
        });
        action$$.then( (story: IStory) => {
            story.modifyTime = 0;
            self.meService.initMe(story);
            this.gv.shownPage = PageType.MediaEdit;
          })
          .catch( err => self.msg.alert(((!!this.pts) ? this.pts.errWrongFormat : `輸入的json檔格式不合。錯誤訊息： `) + `${JSON.stringify(err)}`));
      } else {
        self.msg.alert((!!this.pts) ? this.pts.errFileType : '所選的檔案必須是影片、聲音檔，或者要匯入的json檔。');
        return;
      }
    }
    // * [2018-07-19 21:28] Tell navbar that you want to create a story
    this.meService.sideClickType = SideClickType.new;
  }

  async onLoadFromURL() {
    const self = this;
    try {
      const text = await self.clipboard.getText$$();
      if (!!text) {
        self.Url = text;
      }
    } catch (error) {
      self.msg.pushMessage({type: MessageTypes.Error, message: error});
    }

    let dialogRef;
    self.ngZone.run(_ => {
      dialogRef = this.dialog.open(DialogComponent, {
        width: '50%',
        data: {dType: DialogType.inputUrl, url: self.Url}
      });
    });
    dialogRef.afterClosed().pipe(takeUntil(self._unsubscribed)).subscribe(result => {
      let story: IStory;
      if (!!result === false) {
        return;
      } else if (!!(story = self.storyService.getAStoryFromString(result))) {
      // * [2018-10-09 10:18] For iOS, the user might want to copy Json's file's info to load a Json file
        story.modifyTime = 0;
        self.meService.initMe(story);
      } else {
        // For url
        self.Url = result;
        self.meService.initMe(self.Url);
      }
      self.gv.shownPage = PageType.MediaEdit;
      // * [2018-07-19 21:28] Tell navbar that you want to create a story
      self.meService.sideClickType = SideClickType.new;
    });
  }

  async onStoryDelete(story: IStory) {
    const self = this;
    if (story.meType === PlayerType.file) {
      const isDeleted = await self.fs.getFile$(story.fileName).pipe(map(
        fEntry => self.fs.rmFile$(fEntry)
      ), concatAll()).toPromise();

      self.msg.pushMessage({type: MessageTypes.Info, message: `The file ${story.fileName} is deleted: ${isDeleted}`});
    }
    // this.db.deleteAsync(DbService.storyTableName, ['id', '=', story.id]);
    this.db.deleteAsync(DbService.storyTableName, ['makeTime', '=', story.makeTime]);
    // * [2018-07-19 21:28] Tell navbar that you delete a story
    // this.meService.sideClickType = SideClickType.none;
  }

  onStoryOpen(story: IStory) {
    const duplicatedStory = Object.assign({}, story);
    this.meService.initMe(duplicatedStory);
    this.gv.shownPage = PageType.MediaEdit;
    // * [2018-07-19 21:28] Tell navbar that you select a story
    this.meService.sideClickType = SideClickType.select;
  }
}
