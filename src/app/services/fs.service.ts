import { Injectable } from '@angular/core';
import { DeviceService } from './device.service';
import { Observable, of, fromEvent } from 'rxjs';
import { shareReplay, map, concatAll, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FsService {

  FSReady$: Observable<boolean>;
  fs$: Observable<FileSystem>;

  constructor(private device: DeviceService) {
    this.fs$ = this.getFs$();
    if (device.isCordova === true) {
      this.FSReady$ = device.onDeviceReady.pipe(
        map(_ => {
          if (!!window['isFilePluginReadyRaised'] === false) { return of(true); }
          if (!!window['isFilePluginReadyRaised']() === true) {
            window['initPersistentFileSystem']();
            return of(true);
          } else {
            return fromEvent(window, 'filePluginIsReady').pipe(
              map( ev => true)
            );
          }
        }),
        concatAll()
      ).pipe(shareReplay(1), first());
    } else {
      this.FSReady$ = of(false).pipe(shareReplay(1), first());
    }
  }

  getFs$(): Observable<FileSystem> {
    let obs: Observable<FileSystem>;
    if (this.device.isCordova === true) {
      obs = new Observable<FileSystem>( subs => {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fs => {
          subs.next(fs);
          subs.complete();
        }, subs.error);
      });
    } else {
      obs = of(null);
    }
    return obs.pipe(shareReplay(1), first());
  }

  getFile$(name: string, create: boolean = false, exclusive: boolean = false): Observable<FileEntry> {
    const self = this;
    if (self.device.isCordova === false) {return of(null); }
    const obs = self.fs$.pipe(map(fs => new Observable<FileEntry>( subs => {
      fs.root.getFile(name, {create: create, exclusive: exclusive},
        file => {
          subs.next(file);
          subs.complete();
        },
        subs.error);
    })),
    concatAll()
    );
    return obs;
  }

  writeFile$(fEntry: FileEntry, data: Blob, isAppend: boolean = false): Observable<boolean> {
    const self = this;
    if (self.device.isCordova === false) {return of(null); }
    const obs = new Observable<boolean>( subs => {
      fEntry.createWriter( fWriter => {
        fWriter.onwriteend = e => {
          subs.next(true);
          console.log(e);
          subs.complete();
        };
        fWriter.onerror = subs.error;

        if (isAppend) {
          try {
            fWriter.seek(fWriter.length);
          } catch (e) {
            subs.error(e);
          }
        }
        fWriter.write(data);
      }, subs.error);
    });
    return obs;
  }
}
