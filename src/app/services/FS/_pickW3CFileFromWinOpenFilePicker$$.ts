import _add2WinFAList from "./_add2WinFAList";
import { IW3CFileWithMetadata, IWinOpenFilePickerPara } from "./_FS.declare";
import _pickAWinFile$$ from "./_pickAWinFile$$";

export default async function _pickW3CFileFromWinOpenFilePicker$$(
  params: IWinOpenFilePickerPara
) {
  const self = this;
  try {
    //1. OpenFilePicker
    const file = await _pickAWinFile$$(params);
    //2. Cache it
    let metadata = null;
    if (!!params?.justCacheMedia && /(video|audio)/i.test(file.contentType)) {
      metadata = _add2WinFAList(file);
    }

    //3. Get W3C File
    const w3cFile = (window as any)?.MSApp?.createFileFromStorageFile(
      file
    ) as IW3CFileWithMetadata;

    w3cFile.WinMetaData = metadata;

    return w3cFile;
  } catch (error) {
    console.error(error);
  }
}
