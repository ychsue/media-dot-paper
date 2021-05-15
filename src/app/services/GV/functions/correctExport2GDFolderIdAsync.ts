import { IWithMustSignIn } from "src/app/IO/GAPI/withMustSignIn";
import { Gv2googleService } from "../gv2google.service";

export default async function correctexport2GDFolderIdAsync(
  folderId: string,
  folderName: string = "/YC/MDPYC",
  forWithMustSignIn: IWithMustSignIn = {}
) {
  const self: Gv2googleService = this;

  // 1. If this Id does link to a folder, done
  const GDFolderId = folderId;
  if (!!GDFolderId) {
    try {
      const res = await self.gapiService.service.getInfoFromIdAsync({
        fileId: GDFolderId,
        ...forWithMustSignIn,
      });
      if (res.status === 200) return GDFolderId;
    } catch (error) {
      console.error(`Error in correctexport2GDFolderIdAsync:: ${error.error}`);
    }
  }

  // 2. Get the folder's Id if needed
  folderId = await self.gapiService.service.getFolderIdRecursivelyAsync({
    name: folderName,
    ...forWithMustSignIn,
  });

  // 3. Update the folder's Id
  if (!!folderId) {
    await self.setExport2GDFolderIdAsync(folderId);
  }
  return folderId;
}
