export default async function _getW3CFileFromWinCache$$(token: string) {
  const FA =
    Windows.Storage.AccessCache.StorageApplicationPermissions.futureAccessList;

  let file: Windows.Storage.StorageFile;
  try {
    file = await FA.getFileAsync(token);
  } catch (error) {
    console.error(error);
  }

  const w3cFile = !!file
    ? (window as any)?.MSApp.createFileFromStorageFile(file)
    : file;
  return w3cFile as File;
}
