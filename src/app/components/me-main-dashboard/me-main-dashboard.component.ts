import { Component, OnInit, NgZone } from '@angular/core';
import { MediaEditService, playerAction, MEState } from 'src/app/services/media-edit.service';

@Component({
  selector: 'app-me-main-dashboard',
  templateUrl: './me-main-dashboard.component.html',
  styleUrls: ['./me-main-dashboard.component.css']
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

  constructor(public meService: MediaEditService, private nZone: NgZone) { }

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

  onChangeCurrentTime(ev: MouseEvent, evOf: Element) {
    // * [2018-07-23 11:35] since the support of ev.layerX for mobile is unknown, I tried to get them
    // const target = ev.target as Element;
    const target = evOf;
    const rect = target.getBoundingClientRect();
    const layerX = ev.clientX - rect.left;
    // * [2018-07-23 11:36] Set the seekTime
    this.meService.seekTime = layerX / rect.width * this.meService.duration;
    this.meService.iFrame = -1;
  }
}
