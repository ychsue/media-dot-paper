import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SpeechSynthesisService, SSutterParameters } from '../../services/speech-synthesis.service';
import { PageTextsService } from '../../services/page-texts.service';
import { concat } from 'rxjs/operators';

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

  pts: ISetSSComp;

  constructor(public SSService: SpeechSynthesisService, public ptsService: PageTextsService) {
    if (!!this.utterPara === false) {
      this.utterPara = new SSutterParameters();
    }
  }

  ngOnInit() {
    const self = this;
    self.ptsService.PTSReady$.pipe(concat(self.ptsService.ptsLoaded$)).subscribe(_ => {
      self.pts = self.ptsService.pts.setSSComp;
    });
  }
}
