import { Gv2googleService } from "../gv2google.service";
/**
 * 
 * @param mfId manager file's Id
 * @returns Array[][] | undefined
 */
export default async function getMDPYCSettingsSheetAsync({ mfId, sheetName = "mdpyc" }: { mfId: string, sheetName?: string }) {
    const self = this as Gv2googleService;

    // 1. Get the information of all sheets
    const res = await self.gapiService.service.getSheetsInfoAsync({
        spreadsheetId: mfId
    });
    // 2. Find the sheet and generate this sheet if out of it
    const sheets = res.result.sheets?.filter(sheet => sheet.properties.title === sheetName);
    let sheet: gapi.client.sheets.SheetProperties;
    if (sheets?.length > 0) {
        sheet = sheets[0].properties;
    } else {
        const res = await self.gapiService.service.addASheetAsync({
            spreadsheetId: mfId,
            title: sheetName
        });
        sheet = res.result?.replies[0]?.addSheet?.properties;
    }

    return sheet;
}