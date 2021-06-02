import { FsService } from "../fs.service";

/**
 * A method of FsService which is used to save Windows' files
 * @param params
 */
export default async function _saveWindowsFile$$(params: {
  blobOrWinFile: Blob | Windows.Storage.StorageFile;
  fileName: string;
  typeText?: string;
}) {
  const self = this as FsService;
  let { blobOrWinFile, fileName, typeText = "Plain Text" } = { ...params };

  // * [2018-09-04 11:07] For windows system, I want to use fileSavePicker directly
  const savePicker = new Windows.Storage.Pickers.FileSavePicker();
  savePicker.suggestedStartLocation =
    Windows.Storage.Pickers.PickerLocationId.documentsLibrary;
  // ** [2018-09-04 11:44] Provide it the fileName
  const iDot = fileName.lastIndexOf(".");
  const ext: any = [iDot < 0 ? "" : fileName.slice(iDot)];
  ext.size = 1;
  savePicker.fileTypeChoices.insert(typeText, ext);
  savePicker.suggestedFileName = fileName.substr(0, iDot);

  // ** [2018-09-04 11:47] Get the file and save it
  const winFile = await savePicker.pickSaveFileAsync();
  if (!!winFile) {
    Windows.Storage.CachedFileManager.deferUpdates(winFile);
    if (!!blobOrWinFile["size"]) {
      // ***************** TODO *****************
      // ** I need to know how to save a blob.
      await Windows.Storage.FileIO.writeTextAsync(winFile, ""); // Clear this file
      fileName = winFile.name;
      const blob = <any>blobOrWinFile;
      const input: any = (<MSStream>blob).msDetachStream();
      const output = await winFile.openAsync(
        Windows.Storage.FileAccessMode.readWrite
      );
      await Windows.Storage.Streams.RandomAccessStream.copyAsync(input, output);
      await output.flushAsync();
      input.close();
      output.close();
    } else {
      const file = <Windows.Storage.StorageFile>blobOrWinFile;
      await file.copyAndReplaceAsync(winFile);
    }
    const status = await Windows.Storage.CachedFileManager.completeUpdatesAsync(
      winFile
    );
    // *** [2018-09-04 11:55] Alert about your action
    if (status === Windows.Storage.Provider.FileUpdateStatus.complete) {
      self.msgService.alert(
        (!!self.pts.pts
          ? self.pts.pts.fsService.fileSaved
          : `檔案 {0} 已經存好了`
        ).replace("{0}", `<b style="color:red;">${fileName}</b>`)
      );
    }
  }
}
