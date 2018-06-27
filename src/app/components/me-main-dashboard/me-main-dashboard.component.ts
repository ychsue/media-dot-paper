import { Component, OnInit } from '@angular/core';
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
    this.dataService.onPlayerAction.next(v);
    this._action = v;
  }

  constructor(public dataService: MediaEditService) { }

  ngOnInit() {
  }

  onPlay() {
    this.action = playerAction.play;
  }

  onPause() {
    this.action = playerAction.pause;
  }
}
