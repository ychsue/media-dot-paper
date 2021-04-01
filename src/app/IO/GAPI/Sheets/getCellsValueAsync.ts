import { withMustSignIn } from "../withMustSignIn";

interface IProps {
    range: string,
    spreadsheetId: string
}

interface IOProps extends IProps{
    scopes?: string,
}

export default async function getCellsValueAsync({scopes, ...props}:IOProps) {
    const res = await withMustSignIn((!!scopes)?scopes:'https://www.googleapis.com/auth/spreadsheets')(getCellsValueGAPIAsync)(props);

    return res;

}

async function getCellsValueGAPIAsync({range, spreadsheetId}:IProps) {
    const res = await gapi.client.sheets.spreadsheets.values.get({
        range,
        spreadsheetId
    });

    if(res.status !== 200) throw new Error(`Status: ${res.status}, Text: ${res.statusText}`);
    
    return res;
}