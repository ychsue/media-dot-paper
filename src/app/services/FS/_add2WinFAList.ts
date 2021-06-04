import { FsService } from "../fs.service";
import { IWinCacheMetaData } from "./_FS.declare";

/**
 * It is used to cache an opened file into FutureAccessList
 * @param file It is a StorageFile of Windows
 * @returns An object {t:token, p: file.path}
 */
export default function _add2WinFAList(file: Windows.Storage.StorageFile) {
  const self = this as FsService;
  const FA =
    Windows.Storage.AccessCache.StorageApplicationPermissions.futureAccessList;
  const maxN = !!FA?.maximumItemsAllowed ? FA.maximumItemsAllowed : 1000;
  const nRemoved = Math.floor(maxN / 10);

  //* [2021-06-03 14:44] Remove old 1/10 entries if there are too many entries
  if (FA?.entries.length > maxN - 2) {
    for (let i0 = 0; i0 < nRemoved; i0++) {
      const nLast = FA.entries.length - 1;
      FA.remove(FA.entries[nLast].token);
    }
  }

  //* [2021-06-03 14:46] Add it in
  const token = FA.add(file);

  return {
    token,
    path: file.path,
    type: file.contentType,
  } as IWinCacheMetaData;
}
