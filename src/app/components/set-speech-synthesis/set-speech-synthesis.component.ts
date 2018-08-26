import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SpeechSynthesisService, SSutterParameters } from '../../services/speech-synthesis.service';

@Component({
  selector: 'app-set-speech-synthesis',
  templateUrl: './set-speech-synthesis.component.html',
  styleUrls: ['./set-speech-synthesis.component.css']
})
export class SetSpeechSynthesisComponent implements OnInit {

  @Output() close = new EventEmitter();

  @Output() change: EventEmitter<SSutterParameters> = new EventEmitter();
  @Input() utterPara: SSutterParameters;

  selVoice: SpeechSynthesisVoice;

  constructor(public SSService: SpeechSynthesisService) {
    if (!!this.utterPara === false) {
      this.utterPara = new SSutterParameters();
    }
  }

  ngOnInit() {
  }
}
