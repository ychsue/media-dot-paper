import { IWithMustSignIn, tHOF } from "src/app/IO/GAPI/withMustSignIn";
import correctExport2GDFolderIdAsync from "./functions/correctExport2GDFolderIdAsync";
import getArray2FromObj from "./functions/getArray2FromObj";
import getMangerFileIdAsync from "./functions/getMangerFileIdAsync";
import getMDPYCSettingsSheetAsync from "./functions/getMDPYCSettingsSheetAsync";
import getObjFromArray2 from "./functions/getObjFromArray2";
import { GvService, IExportSettings, ParaInLS } from "./gv.service";
import { Gv2googleService } from "./gv2google.service";

interface IProps extends IWithMustSignIn {
    fName?: string
}

export default async function importGVFromGoogleAsync(props
    : IProps) {
    const self = this as Gv2googleService;

    const getMFIdAsync: typeof getMangerFileIdAsync = getMangerFileIdAsync.bind(self);
    const getSettingsSheetAsync: typeof getMDPYCSettingsSheetAsync = getMDPYCSettingsSheetAsync.bind(self);
    const getExp2FolderIdAsync: typeof correctExport2GDFolderIdAsync =
      correctExport2GDFolderIdAsync.bind(self);

    const __FID = "export2FolderId";

    try {
        self.isImportGVFromGoogleAsync = true;
        // 1. Get the fileId with needed click event
        const theMFId = await getMFIdAsync(props);

        // 2. Get ManagerFile's mdpyc's settings
        const sheetName = 'mdpyc';
        const sheet = await getSettingsSheetAsync({ mfId: theMFId, sheetName });

        // 3. Get the sheet's properties
        const resCells = await self.gapiService.service.getCellsValueAsync({
            range: `${sheetName}`, spreadsheetId: theMFId
        });
        const settingsArray = resCells?.result.values;

        // 4. Get settings from this array
        const objSettings = getObjFromArray2(settingsArray);

        // 5. If this sheet is out of __FID, make that folder and get its Id.
        const folderIdOld = !!objSettings?.result
          ? (objSettings.result as IExportSettings).export2FolderId
          : null;
        const folderId = await getExp2FolderIdAsync(folderIdOld);
        if(folderIdOld !== folderId){
          const hasId = !!objSettings?.position["THIS"]?.export2FolderId;
          const pos = (hasId) ?
              [objSettings.position["THIS"]["_iR"], objSettings.position["THIS"][__FID]] :
              [4, 0];
          const exportData = (hasId) ? [[folderId]] :
              [["THIS", __FID], ["", folderId]];
          const range = `${sheetName}!R${pos[0] + 2}C${pos[1] + 1}` +
              ((hasId) ? '' : `:R${pos[0] + 3}C${pos[1] + 2}`);
          const res = await self.gapiService.service.setCellsValueAsync({
              spreadsheetId: theMFId,
              range,
              resource: { values: exportData }
          })
        }

        // 6. store these data into localStorage and update gvService's values
        if (!!objSettings) {
            const keys = Object.keys(objSettings.result as IExportSettings);
            for (let i0 = 0; i0 < keys.length; i0++) {
                const key = keys[i0];
                if (self.gvService[key] !== undefined) {
                    self.gvService[key] = objSettings.result[key];
                    self.gvService.saveToLocalStorage(ParaInLS[key]);
                } else if (key === __FID) {
                    await self.setExport2GDFolderIdAsync(
                      objSettings.result[key]
                    );
                    self.gvService.saveToLocalStorage(ParaInLS.googleUsers);
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
    self.isImportGVFromGoogleAsync = false;
}