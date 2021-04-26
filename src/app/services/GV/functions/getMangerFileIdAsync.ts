import { IWithMustSignIn, tHOF } from "src/app/IO/GAPI/withMustSignIn";
import { Gv2googleService } from "../gv2google.service";

interface IProps extends IWithMustSignIn {
    fName?: string;
}

export default async function getMangerFileIdAsync(
    { fName = "yc.settings", scopes, signInWithClick, grantWithClick }
        : IProps) {
    const self = this as Gv2googleService;

    // 1. Check whether this file does exist
    const res = await self.gapiService.service.searchItemsAsync({
        q: `name = '${fName}' and trashed = false`,
        fields: "files(id)",
        scopes,
        signInWithClick,
        grantWithClick
    });

    // 2. If I can access google drive but it doesn't have this global setting file, create it
    if (!!!res?.result?.files) throw new Error(`Error： ${JSON.stringify(res)}`);

    let _MFId: string;
    if (res.result.files.length === 0) {
        const res = await self.gapiService.service.createSSAsync({
            title: fName
        });
        _MFId = res?.result?.spreadsheetId;
        // Rename its sheet
        if (!!_MFId) {
            const resRename = await self.gapiService.service.renameASheetAsync({
                spreadsheetId: _MFId,
                sheetId: 0,
                title: 'mdpyc'
            });
            console.log(resRename);
        }
    } else {
        _MFId = res.result.files[0].id;
    }

    return _MFId;
}