import { Component, OnInit } from '@angular/core';
import { MessageService, MessageTypes, OneMessage } from '../../services/message.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  audioFile: File;
  // audioSrc: SafeUrl;
  audioSrc: string;
  isCordovaSupport: boolean;
  isFilePluginSupport: boolean;
  newFolderName: string;

  constructor(private msgService: MessageService, private sanitizer: DomSanitizer,
    private DBService: DbService
  ) { }

  ngOnInit() {
    this.isCordovaSupport = !!window.cordova;
    this.isFilePluginSupport = this.isCordovaSupport && !!cordova.file;
  }

  async onSelFileChange(files: FileList, obj: object) {
    console.log(`obj= ${obj}`);
    this.audioFile = files[0];
    const fName = this.audioFile.name;
    let newFile: any;
    if (!!window.cordova && (cordova.platformId === 'windows')) {
      try {
        const outputFile = await Windows.Storage.KnownFolders.videosLibrary.createFileAsync(this.audioFile.name);
        const outStream = await outputFile.openAsync(Windows.Storage.FileAccessMode.readWrite);
        const inStream = this.audioFile.msDetachStream();
        await Windows.Storage.Streams.RandomAccessStream.copyAsync(inStream, outStream);
        await outStream.flushAsync();
        inStream.close();
        outStream.close();

        newFile = await Windows.Storage.KnownFolders.videosLibrary.getFileAsync(fName);
  } catch (error) {
        this.msgService.pushMessage({type: MessageTypes.Error, message: error});
      }
    } else {
        newFile = this.audioFile;
    }
    // this.audioSrc = this.sanitizer.bypassSecurityTrustUrl('https://www.scripturesongs.net/mp3/h1/01FountainFilledWithBlood.mp3');
    // this.audioSrc = 'https://www.scripturesongs.net/mp3/h1/01FountainFilledWithBlood.mp3';
    // this.audioSrc = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.audioFile));
    this.audioSrc = window.URL.createObjectURL(newFile);
    this.msgService.pushMessage({type : MessageTypes.Info, message: `audioSrc: ${JSON.stringify(this.audioSrc)}`});
  }

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
    this.msgService.pushMessage({type: 0, message: JSON.stringify(result)});
  }

  async ondeleteFromNSQL() {
    await this.DBService.deleteAsync();
  }

  async onUpsertFromNSQL() {
    await this.DBService.upsertAsync();
  }
}
