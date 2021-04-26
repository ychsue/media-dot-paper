import { IWithMustSignIn, tHOF } from "src/app/IO/GAPI/withMustSignIn";
import correctExport2FolderIdAsync from "./functions/correctExport2FolderIdAsync";
import getArray2FromObj from "./functions/getArray2FromObj";
import getMangerFileIdAsync from "./functions/getMangerFileIdAsync";
import getMDPYCSettingsSheetAsync from "./functions/getMDPYCSettingsSheetAsync";
import getObjFromArray2 from "./functions/getObjFromArray2";
import { GvService, ParaInLS } from "./gv.service";
import { Gv2googleService } from "./gv2google.service";

interface IProps extends IWithMustSignIn {
    fName?: string;
}

export default async function exportGV2GoogleAsync(props
    : IProps) {
    const self = this as Gv2googleService;

    const getMFIdAsync: typeof getMangerFileIdAsync = getMangerFileIdAsync.bind(self);
    const getSettingsSheetAsync: typeof getMDPYCSettingsSheetAsync = getMDPYCSettingsSheetAsync.bind(self);
    const getExp2FolderIdAsync: typeof correctExport2FolderIdAsync = correctExport2FolderIdAsync.bind(self);

    try {
        // 1. Get the fileId with needed click events
        const theMFId = await getMFIdAsync(props);

        // 2. Get ManagerFile's mdpyc's settings' sheet
        const sheetName = 'mdpyc';
        const sheet = await getSettingsSheetAsync({ mfId: theMFId, sheetName });

        // 3. initialize the object
        const obj = {
            zoomAll: self.gvService.zoomAll,
            export2FolderId: await getExp2FolderIdAsync(self.gvService),
        };

        // 4. get its array[][]
        const array = getArray2FromObj(obj);

        // 5. export it to the SS
        const resClear = await self.gapiService.service.clearASheetAsync({
            spreadsheetId: theMFId,
            range: `${sheetName}!A6:Z100`
        });
        const res = await self.gapiService.service.setCellsValueAsync({
            spreadsheetId: theMFId,
            range: `${sheetName}!A6`,
            resource: {
                values: array
            }
        });

    } catch (error) {
        window.alert(error.message);
    }
}