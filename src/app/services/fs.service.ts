import { Injectable, SystemJsNgModuleLoader, NgZone } from '@angular/core';
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
      if (cordova.platformId === 'ios') {
        // * [2018-09-05 16:04] Try to initialize the socialsharing
        // const action = new Promise<boolean>((res, rej) => {
        //   device.onDeviceReady.subscribe(_ => {
        //     window.plugins.socialsharing.available(b => res(b));
        //   });
        // });
        // action.then();
        // action.then(b => {
        //   // * [2018-09-05 17:01] ****** TODO ****** dirty start of socialsharing
        //   if (b) {window.plugins.socialsharing.share('Start'); }
        // });
      }
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

  async getDefaultAppStorageDir$$() {
    const self = this;
    if (!!window['cordova'] === false) {
      return null;
    } else if (cordova.platformId === 'android') {
      return await self.getDir$('', false, false, cordova.file.externalDataDirectory).toPromise();
    } else {
      const fs = await self.fs$.pipe(first()).toPromise();
      return fs.root;
    }
  }

  getFileFromURL$$(url: string) {
    const self = this;
    if (self.device.isCordova === false) {return of(null); }
    const action = new Promise<Entry>((res, rej) => {
      window.resolveLocalFileSystemURL(url, res, rej);
    });
    return action;
  }

  async getBlobFromFileEntry$$(fileEntry: FileEntry) {
    let blob: Blob;
    try {
      const getFile$$ = new Promise<File>((res, rej) => {
        fileEntry.file(res, rej);
      });
      blob = await getFile$$;
    } catch (error) {
      console.log(error);
    }
    return blob;
  }

  getFile$(name: string, create: boolean = false, exclusive: boolean = false, dir?: DirectoryEntry): Observable<FileEntry> {
    const self = this;
    if (self.device.isCordova === false) {return of(null); }
    const action = async () => {
      const dirEntry = (!!dir) ? dir : await self.getDefaultAppStorageDir$$();
      if (!!dirEntry) {
        return new Promise<FileEntry>((res, rej) => {
          dirEntry.getFile(name, {create: create, exclusive: exclusive},
            file => {
              res(file);
            },
            rej);
        });
      } else {
        return <Promise<FileEntry>>null;
      }
    };
    return from(action());
  }

  writeFile$(fEntry: FileEntry, data: Blob, isAppend: boolean = false): Observable<boolean> {
    const self = this;
    if (self.device.isCordova === false) {return of(null); }
    const obs = new Observable<boolean>( subs => {
      fEntry.createWriter( fWriter => {
        fWriter.onwriteend = e => {
          subs.next(true);
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
    const blob = new Blob([data], <any>{encoding: 'UTF-8', type: 'text/plain;charset=UTF-8'});
    await this.saveFile$$(blob, fileName, 'Plain Text');
  }

  async saveFile$$(blobOrWinFile: Blob| Windows.Storage.StorageFile, fileName: string, typeText: string = "Plain Text") {
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
        savePicker.fileTypeChoices.insert(typeText, ext);
        savePicker.suggestedFileName = fileName.substr(0, iDot);

        // ** [2018-09-04 11:47] Get the file and save it
        const winFile = await savePicker.pickSaveFileAsync();
        if (!!winFile) {
          Windows.Storage.CachedFileManager.deferUpdates(winFile);
          if (!!blobOrWinFile['size']) {
            // ***************** TODO *****************
            // ** I need to know how to save a blob.
            const blob = <any>blobOrWinFile;
            const input: any = (<MSStream>blob).msDetachStream();
            const output = await winFile.openAsync(Windows.Storage.FileAccessMode.readWrite);
            await Windows.Storage.Streams.RandomAccessStream.copyAsync(input, output);
            await output.flushAsync();
            input.close();
            output.close();
          } else {
            const file = <Windows.Storage.StorageFile>blobOrWinFile;
            await file.copyAndReplaceAsync(winFile);
          }
          const status = await Windows.Storage.CachedFileManager.completeUpdatesAsync(winFile);
          // *** [2018-09-04 11:55] Alert about your action
          if (status === Windows.Storage.Provider.FileUpdateStatus.complete) {
            self.msgService.alert(((!!self.pts.pts) ? self.pts.pts.fsService.fileSaved :
            `檔案 {0} 已經存好了`).replace('{0}', `<b style="color:red;">${fileName}</b>`));
          }
        }
      } else if (cordova.platformId === 'android' || cordova.platformId === 'osx') {
        const permissions = cordova.plugins.permissions;
        if (cordova.platformId === 'android') {
          // * [2018-09-04 15:21] Check permission at first
          const isOK = self.device.getPermissionIfNeeded(self.device.permissions.READ_EXTERNAL_STORAGE);
          if (!!!isOK) {
            self.msgService.alert((!!self.pts.pts) ? self.pts.pts.fsService.noPermission : '沒辦法取得你的認可，所以無法存檔，抱歉。');
            return null;
          }
        }
        // * [2018-09-04 15:29] Let me store the file
        let downloadDir: DirectoryEntry;
        if (cordova.platformId === 'android') {
          downloadDir = await self.getDir$('download', false, false, cordova.file.externalRootDirectory).toPromise();
        } else {
          downloadDir = await self.getDir$('', false, false, cordova.file.downloadsDirectory).toPromise();
        }
        if (!!downloadDir) {
          const fileEntry = await self.getFile$(fileName, true, false, downloadDir).toPromise();
          // const blob = new Blob([data], {type: 'text/plain'});
          const blob = <Blob>blobOrWinFile;
          const isDone = await self.writeFile$(fileEntry, blob).toPromise();
          if (isDone) {
            self.msgService.alert(((!!self.pts.pts) ? self.pts.pts.fsService.fileSaved :
            `檔案 {0} 已經存好了`).replace('{0}', `<b style="color:red;">${fileEntry.nativeURL}</b>`));
            console.log(fileEntry.toURL());
          }
        }
      } else if ( cordova.platformId === 'ios' ) {
        // * [2018-09-05 14:19] Save it into cacheDirectory
        const cacheDir = await self.getDir$('', false, false, cordova.file.cacheDirectory).toPromise();
        let isSaved = false;
        let fileEntry: FileEntry;
        if (!!cacheDir) {
          fileEntry = await self.getFile$(fileName, true, false, cacheDir).toPromise();
          // const blob = new Blob([data], {type: 'text/plain'});
          const blob = <Blob>blobOrWinFile;
          isSaved = await self.writeFile$(fileEntry, blob).toPromise();
          if (isSaved) {
            self.msgService.alert(((!!self.pts.pts) ? self.pts.pts.fsService.fileSaved :
            `檔案 {0} 已經存好了`).replace('{0}', `<b style="color:red;">${fileName}</b>`));
          }
        }
        // * [2018-09-05 14:24] Share this file
        let action: Promise<any>;
        if (isSaved) {
          // action = new Promise<any>((res, rej) => {
          //   window.plugins.socialsharing.available(b => res(b));
          // });
          // if ((await action) === false) {
          //   self.msgService.alert((!!self.pts.pts) ? self.pts.pts.fsService.cannotShare : 'Oh, I cannot share the file.');
          // } else {
              action = new Promise<any>((res, rej) => {
                let fPath = fileEntry.toURL();
                if (fPath.indexOf(fileName) === -1) {
                  console.log(`${fileName}已經被改成${fPath}. Be careful.`);
                  fPath = decodeURIComponent(fPath);
                }
                // window.plugins.socialsharing.shareWithOptions({files: fileEntry.toURL()}, res, rej);
                // window.plugins.socialsharing.shareWithOptions({message: data}, res, rej);
                (<any>cordova.plugins['fileOpener2']).showOpenWithDialog(
                  fPath,
                  'text/plain',
                  {error: rej, success: res}
                );
              });
              console.log('before sharing: file path: ' + fileEntry.toURL());
              try {
                const result = await action;
              } catch (error) {
                console.log('I cannot open this file: ' + error.status + ': ' + error.message);
              }
              console.log('after sharing');
              // console.log(JSON.stringify(result));
              // if (result.completed === true) {
              //   self.msgService.alert(((!!self.pts.pts) ? self.pts.pts.fsService.askSavingToFile : '請將取得的文字存到{0}的檔案裡頭，這些文字才能被正確使用。')
              //   .replace('{0}', '<b style="color:red;">' + fileName.substring(fileName.lastIndexOf('.')) + '</b>'));
              // }
          // }
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
