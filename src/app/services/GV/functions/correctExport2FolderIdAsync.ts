import { GvService } from "../gv.service";
import { Gv2googleService } from "../gv2google.service"

export default async function correctExport2FolderIdAsync(settings: GvService, folderName: string = "/YC/MDPYC") {
    const self: Gv2googleService = this;

    // 1. If this Id does link to a folder, done
    if (!!settings?.export2FolderId) {
        try {
            const res = await self.gapiService.service.getInfoFromIdAsync({ fileId: settings.export2FolderId });
            if (res.status === 200) return settings.export2FolderId;
        } catch (error) {
            console.error(error);
        }
    }

    // 2. Get the folder's Id if needed
    const folderId = await self.gapiService.service.getFolderIdRecursivelyAsync({
        name: folderName
    });

    // 3. Update the folder's Id
    if (!!folderId) { self.gvService.export2FolderId = folderId; }
    return folderId;
}