import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaEditService } from '../../services/media-edit.service';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil, first } from 'rxjs/operators';
import { CrossCompService } from 'src/app/services/cross-comp.service';
import { PlayerType } from 'src/app/vm/player-type.enum';

@Component({
  selector: 'app-mdps-list',
  templateUrl: './mdps-list.component.html',
  styleUrls: ['./mdps-list.component.css', '../../common-use.css']
})
export class MdpsListComponent implements OnInit, OnDestroy {

  constructor(public meService: MediaEditService,
    private crossComp: CrossCompService // Gotten videoEle from it
    ) { }

  unsubscribed$ = new Subject<boolean>();

  ngOnInit() {}

  ngOnDestroy(): void {
    this.unsubscribed$.next(true);
    this.unsubscribed$.complete();
    this.unsubscribed$ = null;
  }

  onChangeFrame(i: number) {
    const self = this;
    self.crossComp.clickVideoLoad_justIOS(self._onChangeFrame.bind(self), i);
    self._onChangeFrame(i);
  }

  private _onChangeFrame(i: number) {
    const self = this;
    this.meService.setiFrame(i);
    if (i >= 0) {
      this.meService.seekTime = this.meService.story.frames[i].start;
    }
  }
}
