import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { DeviceService } from './device.service';
import { Observable, of, fromEvent, from } from 'rxjs';
import { shareReplay, map, concatAll, first, concat, last } from 'rxjs/operators';
import { MessageService } from './message.service';
import { PageTextsService } from './page-texts.service';

@Injectable({
  providedIn: 'root'
})
export class FsService {

  FSReady$: Observable<boolean>;
  fs$: Observable<FileSystem>;

  constructor( private pts: PageTextsService,
    private device: DeviceService, private msgService: MessageService) {
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

  getDir$(path: string, create: boolean = false, exclusive: boolean = false, fsURL?: string): Observable<DirectoryEntry> {
    const self = this;
    if (!!fsURL === true) {
      return new Observable<DirectoryEntry>(sub => {
        window.resolveLocalFileSystemURL(fsURL + path,
          entry => {sub.next(entry as DirectoryEntry); sub.complete(); },
          err => sub.error(err)
        );
      });
    }
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

  getFile$(name: string, create: boolean = false, exclusive: boolean = false, dir?: DirectoryEntry): Observable<FileEntry> {
    const self = this;
    if (self.device.isCordova === false) {return of(null); }
    const obs = self.fs$.pipe(map(fs => new Observable<FileEntry>( subs => {
      const dirEntry = (!!dir) ? dir : fs.root;
      dirEntry.getFile(name, {create: create, exclusive: exclusive},
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

  async saveTxtFile$$(data: string, fileName: string) {
    const self = this;
    if (!!fileName === false) {
      return null;
    }
    if (!!window.cordova === false) {
      // * [2018-09-04 11:06] TODO: ignore the case for pure angular project
      return null;
    } else {
      if (cordova.platformId === 'windows') {
        // * [2018-09-04 11:07] For windows system, I want to use fileSavePicker directly
        const savePicker = new Windows.Storage.Pickers.FileSavePicker();
        savePicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.documentsLibrary;
        // ** [2018-09-04 11:44] Provide it the fileName
        const iDot = fileName.lastIndexOf('.');
        const ext: any = [(iDot < 0) ? '' : fileName.slice(iDot)];
        ext.size = 1;
        savePicker.fileTypeChoices.insert("Plain Text", ext);
        savePicker.suggestedFileName = fileName.substr(0, iDot);

        // ** [2018-09-04 11:47] Get the file and save it
        const winFile = await savePicker.pickSaveFileAsync();
        if (!!winFile) {
          Windows.Storage.CachedFileManager.deferUpdates(winFile);
          await Windows.Storage.FileIO.writeTextAsync(winFile, data);
          const status = await Windows.Storage.CachedFileManager.completeUpdatesAsync(winFile);
          // *** [2018-09-04 11:55] Alert about your action
          if (status === Windows.Storage.Provider.FileUpdateStatus.complete) {
            self.msgService.alert(((!!self.pts.pts) ? self.pts.pts.fsService.fileSaved :
            `檔案 {0} 已經存好了`).replace('{0}', `<b style="color:red;">${fileName}</b>`));
          }
        }
      } else if (cordova.platformId === 'android') {
        const permissions = cordova.plugins.permissions;
        let action: Promise<AndroidPermissionsState>;
        // * [2018-09-04 15:21] Check permission at first
        action = new Promise<AndroidPermissionsState>((res, rej) => {
          permissions.checkPermission(permissions.READ_EXTERNAL_STORAGE, res, rej);
        });
        if ((await action).hasPermission === false) {
          // ** [2018-09-04 15:26] Since out of permission, request for one
          action = new Promise<AndroidPermissionsState>((res, rej) => {
            permissions.requestPermission(permissions.READ_EXTERNAL_STORAGE, res, rej);
          });
          if ((await action).hasPermission === false) {
            self.msgService.alert((!!self.pts.pts) ? self.pts.pts.fsService.noPermission : '沒辦法取得你的認可，所以無法存檔，抱歉。');
            return null;
          }
        }
        // * [2018-09-04 15:29] Let me store the file
        const downloadDir = await self.getDir$('download', false, false, cordova.file.externalRootDirectory).toPromise();
        if (!!downloadDir) {
          const fileEntry = await self.getFile$(fileName, true, false, downloadDir).toPromise();
          const blob = new Blob([data], {type: 'text/plain'});
          const isDone = await self.writeFile$(fileEntry, blob).toPromise();
          if (isDone) {
            self.msgService.alert(((!!self.pts.pts) ? self.pts.pts.fsService.fileSaved :
            `檔案 {0} 已經存好了`).replace('{0}', `<b style="color:red;">${fileName}</b>`));
          }
        }
      }
    }
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
