import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { merge, Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { debounceTime, first, take, takeUntil } from 'rxjs/operators';
import { DeviceService } from '../device.service';
import { TextInputAgentComponent } from './text-input-agent/text-input-agent.component';

@Injectable({
  providedIn: 'root'
})
export class TextInputAgentService {

  readonly MIN_HEIGHT = 400;
  readonly _unsubscribe = new Subject<boolean>();

  constructor(public dialog: MatDialog, public device: DeviceService) { }

  async subscribeWithInit({ work, timestamp, initSt, unsubscribe = new Observable(), returnWork = () => { } }:
    { work: (_: string) => void, timestamp?: number, initSt: string, unsubscribe?: Observable<any>, returnWork?: () => void }) {
    const self = this;
    // 1. Get Size after resizing
    const size = await self.device.onWindowResizeReplay$.pipe(debounceTime(3000), take(1)).toPromise();

    console.log(`current height: ${window.innerHeight}`);

    if (size.value.height < self.MIN_HEIGHT) {
      // 2. Show the dialog
      const dialogRef = self.dialog.open(TextInputAgentComponent, {
        width: "80%",
        data: initSt
      });
      // 3. Wire it with the component
      const comp = dialogRef.componentInstance;
      comp.textChanged$.pipe(takeUntil(merge(self._unsubscribe, unsubscribe))).subscribe(work);
      // 4. Get the focus
      comp.textDataRef.nativeElement.focus();
      comp.textDataRef.nativeElement.setSelectionRange(0, 0);

      const res = await dialogRef.afterClosed().pipe(first()).toPromise();
      self._unsubscribe.next(true);
      returnWork();
    }
  }
}
