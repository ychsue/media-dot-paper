import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaEditService } from '../../services/media-edit.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-mdps-list',
  templateUrl: './mdps-list.component.html',
  styleUrls: ['./mdps-list.component.css', '../../common-use.css']
})
export class MdpsListComponent implements OnInit, OnDestroy {

  constructor(public meService: MediaEditService) { }

  unsubscribed$ = new Subject<boolean>();

  ngOnInit() {}

  ngOnDestroy(): void {
    this.unsubscribed$.next(true);
    this.unsubscribed$.complete();
    this.unsubscribed$ = null;
  }

  onChangeFrame(i: number) {
    this.meService.setiFrame(i);
    if (i >= 0) {
      this.meService.seekTime = this.meService.story.frames[i].start;
    }
  }
}
