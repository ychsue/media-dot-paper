import { withMustSignIn } from "../withMustSignIn";

interface IProps {
    range: string,
    spreadsheetId: string,
    resource: gapi.client.sheets.ValueRange // {values: any[][]}
    valueInputOption?: string
}

interface IOProps extends IProps{
    scopes?: string,
}

export default async function setCellsValueAsync({scopes, ...props}:IOProps) {
    const res = await withMustSignIn((!!scopes)?scopes:'https://www.googleapis.com/auth/spreadsheets')(setCellsValueGAPIAsync)(props);

    return res;    
}

async function setCellsValueGAPIAsync({range, spreadsheetId, resource, valueInputOption=`RAW`}:IProps) {
    const res = await gapi.client.sheets.spreadsheets.values.update({
        range,
        spreadsheetId,
        resource,
        valueInputOption
    });

    if(res.status!== 200) throw new Error(`setCellsValueAsync Error status: ${res.status}, text: ${res.statusText}`);
    
    return res;
}