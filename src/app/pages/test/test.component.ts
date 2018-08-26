import { Component, OnInit } from '@angular/core';
import { MessageService, MessageTypes, OneMessage } from '../../services/message.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DbService } from '../../services/db.service';
import { FsService } from '../../services/fs.service';
import { map, concatAll } from '../../../../node_modules/rxjs/operators';
import { SpeechSynthesisService, SSutterParameters } from '../../services/speech-synthesis.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  selVoice: SpeechSynthesisVoice;

  entries: Entry[];
  audioFile: File;
  // audioSrc: SafeUrl;
  audioSrc: string;
  isCordovaSupport: boolean;
  isFilePluginSupport: boolean;
  newFolderName: string;

  constructor(private msgService: MessageService, private sanitizer: DomSanitizer,
    private DBService: DbService , private fsService: FsService,
    public SSService: SpeechSynthesisService
  ) {
    const self = this;
    SSService.getVoices$.subscribe(isGotten => {
      if (isGotten) {
        self.selVoice = SSService.defaultVoice;
      }
    });
  }

  ngOnInit() {
    const self = this;
    this.isCordovaSupport = !!window.cordova;
    this.isFilePluginSupport = this.isCordovaSupport && !!cordova.file;
    this.fsService.ls$('').subscribe(entries => self.entries = entries);
  }

  async onSelFileChange(files: FileList, obj: object) {
    const file = files[0];
    const self = this;
    if (!!file === false) { return; }
    await this.fsService.getFile$(file.name, true).pipe(
      map(fEntry => {
        return self.fsService.writeFile$(fEntry, file);
      }), concatAll()).toPromise();

    this.fsService.ls$('').subscribe(entries => self.entries = entries);
  }

  onRmFile(file: FileEntry) {
    const self = this;
    this.fsService.rmFile$(file).subscribe();
    this.fsService.ls$('').subscribe(entries => self.entries = entries);
  }

  onClickAFile(file: FileEntry) {
    this.audioSrc = this.fsService.toURL(file);
  }

  // async onSelFileChange_for_windows_videoLibrary(files: FileList, obj: object) {
  //   console.log(`obj= ${obj}`);
  //   this.audioFile = files[0];
  //   const fName = this.audioFile.name;
  //   let newFile: any;
  //   if (!!window.cordova && (cordova.platformId === 'windows')) {
  //     try {
  //       const outputFile = await Windows.Storage.KnownFolders.videosLibrary.createFileAsync(this.audioFile.name);
  //       const outStream = await outputFile.openAsync(Windows.Storage.FileAccessMode.readWrite);
  //       const inStream = this.audioFile.msDetachStream();
  //       await Windows.Storage.Streams.RandomAccessStream.copyAsync(inStream, outStream);
  //       await outStream.flushAsync();
  //       inStream.close();
  //       outStream.close();

  //       newFile = await Windows.Storage.KnownFolders.videosLibrary.getFileAsync(fName);
  // } catch (error) {
  //       this.msgService.pushMessage({type: MessageTypes.Error, message: error});
  //     }
  //   } else {
  //       newFile = this.audioFile;
  //   }
  //   // this.audioSrc = this.sanitizer.bypassSecurityTrustUrl('https://www.scripturesongs.net/mp3/h1/01FountainFilledWithBlood.mp3');
  //   // this.audioSrc = 'https://www.scripturesongs.net/mp3/h1/01FountainFilledWithBlood.mp3';
  //   // this.audioSrc = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.audioFile));
  //   this.audioSrc = window.URL.createObjectURL(newFile);
  //   this.msgService.pushMessage({type : MessageTypes.Info, message: `audioSrc: ${JSON.stringify(this.audioSrc)}`});
  // }

  async onGetDocFolder() {
    if (!!window['Windows']) {
      const docFolder = Windows.Storage.KnownFolders.videosLibrary;
      const newFolder = await docFolder.createFolderAsync('Test');
      if (newFolder != null) {
        this.newFolderName = newFolder.path;
      }
    }
  }

  async onSelectFromNSQL() {
    const result = await this.DBService.searchAsync();
  }

  async ondeleteFromNSQL() {
    await this.DBService.deleteAsync();
  }

  async onUpsertFromNSQL() {
    await this.DBService.upsertAsync();
  }

  onSpeak(text: string) {
    const para = new SSutterParameters();
    para.text = text;
    para.voice = this.selVoice;
    this.SSService.speak(para);
  }
}
