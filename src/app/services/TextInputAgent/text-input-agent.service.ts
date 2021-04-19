import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { merge, Observable, timer } from 'rxjs';
import { Subject } from 'rxjs';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { debounceTime, first, map, skip, take, takeUntil, takeWhile } from 'rxjs/operators';
import { DeviceService } from '../device.service';
import { TextInputAgentComponent } from './text-input-agent/text-input-agent.component';

@Injectable({
  providedIn: 'root'
})
export class TextInputAgentService {

  readonly MIN_HEIGHT = 400;
  readonly _unsubscribe = new Subject<boolean>();
  _minHeight = 1000;

  constructor(public dialog: MatDialog, public device: DeviceService) { }

  async subscribeWithInit({ work, timestamp, initSt, unsubscribe = new Observable(),
    onOpened = () => { },
    onClosed = () => { } }:
    {
      work: (_: string) => void, timestamp?: number, initSt: string, unsubscribe?: Observable<any>,
      onOpened?: () => void,
      onClosed?: () => void,
    }) {
    const self = this;
    // 1. Get Size after resizing (if it has)
    const subDelay = timer(10000);
    const subResize = self.device.onWindowResizeReplay$;
    const shouldWait = (x) => {
      if (typeof x === 'number') return false;
      self._minHeight = (window?.innerHeight < self._minHeight) ? window.innerHeight : self._minHeight;
      if (self._minHeight < self.MIN_HEIGHT) return false;
      return true;
    }
    const size = await merge(subDelay, subResize).pipe(takeWhile(shouldWait)).toPromise();

    // 2. Get the minimun height

    if (self._minHeight < self.MIN_HEIGHT) {
      // 2. Show the dialog
      const dialogRef = self.dialog.open(TextInputAgentComponent, {
        width: "80%",
        data: initSt
      });
      onOpened();
      // 3. Wire it with the component
      const comp = dialogRef.componentInstance;
      comp.textChanged$.pipe(takeUntil(merge(self._unsubscribe, unsubscribe))).subscribe(work);
      // 4. Get the focus
      const txtInputEle = comp.textDataRef.nativeElement;
      txtInputEle.focus();
      txtInputEle.setSelectionRange(0, 1);

      const res = await dialogRef.afterClosed().pipe(first()).toPromise();

      self._unsubscribe.next(true);
      onClosed();
    }
  }
}
