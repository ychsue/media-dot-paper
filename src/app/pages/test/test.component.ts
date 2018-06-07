import { Component, OnInit } from '@angular/core';
import { MessageService, MessageTypes, OneMessage } from '../../services/message.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  audioFile: File;
  // audioSrc: SafeUrl;
  audioSrc: string;

  constructor(private msgService: MessageService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  onSelFileChange(files: FileList) {
    this.audioFile = files[0];
    // this.audioSrc = this.sanitizer.bypassSecurityTrustUrl('https://www.scripturesongs.net/mp3/h1/01FountainFilledWithBlood.mp3');
    // this.audioSrc = 'https://www.scripturesongs.net/mp3/h1/01FountainFilledWithBlood.mp3';
    // this.audioSrc = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.audioFile));
    this.audioSrc = window.URL.createObjectURL(this.audioFile);
    this.msgService.pushMessage({type : MessageTypes.Info, message: `files: ${JSON.stringify(files[0].name)}`});
  }
}
