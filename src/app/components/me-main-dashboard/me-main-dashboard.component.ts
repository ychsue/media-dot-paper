import { Component, OnInit, NgZone } from '@angular/core';
import { MediaEditService, playerAction, MEState } from 'src/app/services/media-edit.service';
import { MessageService } from '../../services/message.service';
import { CrossCompService } from 'src/app/services/cross-comp.service';
import { PlayerType } from 'src/app/vm/player-type.enum';
import { fromEvent } from 'rxjs';
import { takeUntil, first } from 'rxjs/operators';

@Component({
  selector: 'app-me-main-dashboard',
  templateUrl: './me-main-dashboard.component.html',
  styleUrls: ['./me-main-dashboard.component.css', '../../common-use.css']
})
export class MeMainDashboardComponent implements OnInit {

  mEState = MEState;
  pAction = playerAction;
  private _action = playerAction.none;
  public get action(): playerAction {
    return this._action;
  }
  public set action(v: playerAction) {
    this.meService.onPlayerAction.next(v);
    this._action = v;
  }

  constructor(public meService: MediaEditService, public msg: MessageService,
     private nZone: NgZone,
     private crossComp: CrossCompService // for getting videoEle
     ) { }

  ngOnInit() {
  }

  onPlay() {
    this.nZone.run( () => {
      this.action = playerAction.play;
    });
  }

  onPause() {
    this.nZone.run( () => {
      this.action = playerAction.pause;
    });
  }

  async onChangeCurrentTime(ev: MouseEvent, evOf: Element) {
    // * [2018-09-12 11:21] Used to avoid to seekTime when it is not ready
    const self = this;
    // * [2018-11-23 15:42] For iOS
    self.crossComp.clickVideoLoad_justIOS(self._onChangeCurrentTime.bind(self), ev, evOf, false);

    await self._onChangeCurrentTime(ev, evOf);
  }

  private async _onChangeCurrentTime(ev: MouseEvent, evOf: Element, isChecking: boolean = true) {
    // * [2018-09-12 11:21] Used to avoid to seekTime when it is not ready
    const self = this;
    const state = this.meService.state;
    // console.log(state);
    if (isChecking && (await self.meService.canGetCurrentTime$$() === false)  ) {
          self.msg.alert('Sorry, it is not ready. Please wait.');
        return;
    }

    // * [2018-07-23 11:35] since the support of ev.layerX for mobile is unknown, I tried to get them
    // const target = ev.target as Element;
    const target = evOf;
    const rect = target.getBoundingClientRect();
    const layerX = ev.clientX - rect.left;
    // * [2018-07-23 11:36] Set the seekTime
    this.meService.seekTime = layerX / rect.width * this.meService.duration;
    this.meService.setiFrame(-1);
  }
}
