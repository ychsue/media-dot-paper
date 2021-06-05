import { FsService } from "../fs.service";
import { IWinOpenFilePickerPara } from "./_FS.declare";

export default async function _pickAWinFile$$(param: IWinOpenFilePickerPara) {
  const self = this as FsService;

  const { fileTypeFilter = ["*"] } = { ...param };
  const NPickers = Windows.Storage.Pickers;

  const picker = new NPickers.FileOpenPicker();
  picker.fileTypeFilter.replaceAll(fileTypeFilter as any);
  return await picker.pickSingleFileAsync();
}
