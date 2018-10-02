import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageTextsService } from '../../services/page-texts.service';
import { Subject } from 'rxjs';
import { takeUntil, merge } from 'rxjs/operators';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  unsubscribed$ = new Subject<boolean>();

  pts: IWelcomePage;

  constructor(private ptsService: PageTextsService) {
    const self = this;
    ptsService.PTSReady$.pipe(merge(ptsService.ptsLoaded$), takeUntil(self.unsubscribed$))
    .subscribe(_ => {
      self.pts = ptsService.pts.welcomePage;
    });
   }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.unsubscribed$.next(true);
    this.unsubscribed$.complete();
    this.unsubscribed$ = null;
  }
}
