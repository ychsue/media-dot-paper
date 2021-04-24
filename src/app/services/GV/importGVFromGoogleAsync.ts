import { tHOF } from "src/app/IO/GAPI/withMustSignIn";
import correctExport2FolderIdAsync from "./functions/correctExport2FolderIdAsync";
import getArray2FromObj from "./functions/getArray2FromObj";
import getMangerFileIdAsync from "./functions/getMangerFileIdAsync";
import getMDPYCSettingsSheetAsync from "./functions/getMDPYCSettingsSheetAsync";
import getObjFromArray2 from "./functions/getObjFromArray2";
import { GvService, ParaInLS } from "./gv.service";
import { Gv2googleService } from "./gv2google.service";

export default async function exportGV2GoogleAsync(props
    : { fName?: string, scopes?: string, signInWithClick?: tHOF }) {
    const self = this as Gv2googleService;

    const getMFIdAsync: typeof getMangerFileIdAsync = getMangerFileIdAsync.bind(self);
    const getSettingsSheetAsync: typeof getMDPYCSettingsSheetAsync = getMDPYCSettingsSheetAsync.bind(self);
    const getExp2FolderIdAsync: typeof correctExport2FolderIdAsync = correctExport2FolderIdAsync.bind(self);

    try {
        // 1. Get the fileId
        const theMFId = await getMFIdAsync(props);

        // 2. Get ManagerFile's mdpyc's settings as an array[][]
        const sheetName = 'mdpyc';
        const sheet = await getSettingsSheetAsync({ mfId: theMFId, sheetName });

        // 3. Get the sheet's properties
        const resCells = await self.gapiService.service.getCellsValueAsync({
            range: `${sheetName}`, spreadsheetId: theMFId
        });
        const settingsArray = resCells?.result.values;

        // 4. Get settings from this array
        const objSettings = getObjFromArray2(settingsArray);

        // 5. If this sheet is out of "export2FolderId", make that folder and get its Id.
        const folderId = await getExp2FolderIdAsync(objSettings?.result as GvService);
        const hasId = !!objSettings?.position["THIS"]?.export2FolderId;
        const pos = (hasId) ?
            [objSettings.position["THIS"]["_iR"], objSettings.position["THIS"]["export2FolderId"]] :
            [4, 0];
        const exportData = (hasId) ? [[folderId]] :
            [["THIS", "export2FolderId"], ["", folderId]];
        const range = `${sheetName}!R${pos[0] + 2}C${pos[1] + 1}` +
            ((hasId) ? '' : `:R${pos[0] + 3}C${pos[1] + 2}`);
        const res = await self.gapiService.service.setCellsValueAsync({
            spreadsheetId: theMFId,
            range,
            resource: { values: exportData }
        })

        // 6. store these data into localStorage and update gvService's values
        if (!!objSettings) {
            const keys = Object.keys(objSettings.result);
            for (let i0 = 0; i0 < keys.length; i0++) {
                const key = keys[i0];
                if (self.gvService[key] !== undefined) {
                    self.gvService[key] = objSettings.result[key];
                    self.gvService.saveToLocalStorage(ParaInLS[key]);
                }
            }
        }
        // // ********** TEST **********
        // const test = getArray2FromObj({
        //     'a': 5, 'b': 7, 'c': 'alpha',
        //     'd': { 'al': '7', 'be': 2 }, 'e': 8,
        //     'f': { 'x': { 'o': 7, 'p': 8 }, 'y': { 'p': 3 } },
        //     'g': [7, 1, { 'a': 'sl' }, 8, 3],
        //     'h': { "p": { "s": 8 } }
        // });
        // console.log(test);
        // const test2 = getObjFromArray2(test);
        // console.log(test2);
    } catch (error) {
        window.alert(error.message);
    }
}