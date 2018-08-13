import { Component, OnInit, NgZone, AfterViewInit } from '@angular/core';
import { GvService, PageType } from '../../services/gv.service';
import { MediaEditService, SideClickType } from '../../services/media-edit.service';
import { MatDialog } from '@angular/material';
import { DialogComponent, DialogType } from '../../dialog/dialog.component';
import { DbService } from '../../services/db.service';
import { Observable, Subject, from } from 'rxjs';
import { IStory } from '../../services/story.service';
import { map, concatAll } from 'rxjs/operators';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FsService } from '../../services/fs.service';
import { MessageService, MessageTypes } from '../../services/message.service';
import { PlayerType } from '../../vm/player-type.enum';
import { ClipboardService } from '../../services/clipboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  Url = 'https://dzxuyknqkmi1e.cloudfront.net/odb/2018/06/odb-06-12-18.mp3';
  testYoutubeUrl = 'https://youtu.be/f1SZ5GaAp3g';

  stories$: Observable<IStory[]>;
  stories: IStory[];
  storySearch$ = new Subject<IStory>();

  pageType = PageType;
  constructor(public gv: GvService, public dialog: MatDialog,
    private meService: MediaEditService, private db: DbService,
    private ngZone: NgZone, private fs: FsService
    , private msg: MessageService, private clipboard: ClipboardService) {
    }

  ngOnInit() {
    const self = this;
    // from(this.db.searchAsync()).subscribe(this.stories$);
    self.db.onDataChanged.subscribe(data => self.storySearch$.next(null));
    self.stories$ = self.storySearch$.pipe(map(val => {
      if (val === null) { return self.db.searchAsync(DbService.storyTableName, null, null, {viewTime: 'desc'}); }
    }),
    concatAll()
    );
    self.stories$.subscribe(s => {
      self.ngZone.run(() => {
        self.stories = s;
      });
    });
    // * [2018-08-01 10:27] Check whether FsPlugin is available now
    self.fs.FSReady$.subscribe(v => self.msg.pushMessage({type: MessageTypes.Info, message: `FSReady = ${v}`}));
  }

  ngAfterViewInit() {
    this.storySearch$.next(null); // initialize the search
  }

  onFileSelect(files: FileList) {
    if (files !== null && files.length > 0) {
      const file = files[0];
      this.meService.initMe(file);
      this.gv.shownPage = PageType.MediaEdit;
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
    dialogRef.afterClosed().subscribe(result => {
      if (!!result === false) {return; }
      self.Url = result;
      self.meService.initMe(self.Url);
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
    const duplicatedStory = Object.assign(story);
    this.meService.initMe(duplicatedStory);
    this.gv.shownPage = PageType.MediaEdit;
    // * [2018-07-19 21:28] Tell navbar that you select a story
    this.meService.sideClickType = SideClickType.select;
  }
}
