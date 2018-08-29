import { Injectable } from '@angular/core';
import { DeviceService } from './device.service';
import { Observable, of, fromEvent } from 'rxjs';
import { shareReplay, map, concatAll, first, concat, last } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FsService {

  FSReady$: Observable<boolean>;
  fs$: Observable<FileSystem>;

  constructor(private device: DeviceService) {
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
    this.fs$ = this.getFs$();
  }

  getFs$(): Observable<FileSystem> {
    let obs: Observable<FileSystem>;
    obs = this.FSReady$.pipe(map(isReady => {
      if (isReady) {
        return new Observable<FileSystem>( subs => {
          window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fs => {
            subs.next(fs);
            subs.complete();
          }, subs.error);
        });
      } else {
        return of(null);
      }
    }), concatAll());
    return obs.pipe(shareReplay(1), first());
  }

  getDir$(path: string, create: boolean = false, exclusive: boolean = false): Observable<DirectoryEntry> {
    const self = this;
    return self.fs$.pipe(map(fs => {
      if (!!fs === false) {
        return of(null);
      } else {
        return new Observable<DirectoryEntry>( subs => {
          if (!!path === false) {
            subs.next(fs.root);
            subs.complete();
          } else {
            fs.root.getDirectory(path, {create: create, exclusive: exclusive},
              dir => {
                subs.next(dir);
                subs.complete();
              },
              subs.error
            );
          }
        });
      }
    }), concatAll());
  }

  ls$(dir: DirectoryEntry| string): Observable<Entry[]> {
    const self = this;
    if (typeof dir === 'string') {
      return self.getDir$(dir).pipe(map(dEntry => {
        return self.ls$(dEntry);
      }), concatAll());
    } else {
      if (!!dir === false) {return of(null); }

      return new Observable<Entry[]>( subs => {
        dir.createReader().readEntries(
          entries => {
            subs.next(entries);
            subs.complete();
          },
          subs.error
        );
      });
    }
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

  rmFile$(file: FileEntry) {
    return new Observable<boolean>( subs => {
      if (!!file === false) {
        subs.next(false);
        subs.complete();
        return;
      }
      file.remove(
        () => {
          subs.next(true);
          subs.complete();
        },
        subs.error);
    });
  }

  toURL(file: FileEntry) {
    return file.toURL();
  }
}
