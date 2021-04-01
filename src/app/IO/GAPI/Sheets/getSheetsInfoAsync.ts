import { withMustSignIn } from "../withMustSignIn";

interface IProps {
    spreadsheetId: string,
    fields?: string,
}

interface ISProps extends IProps {
    scopes?: string,
}

async function getSheetsInfoGAPIAsync({spreadsheetId, fields='sheets'}:IProps) {

    const res = await gapi.client.sheets.spreadsheets.get({
        spreadsheetId,
        fields
    });

    if (res.status !== 200) throw new Error(`status: ${res.status}, text: ${res.statusText}`);
    
    return res;
}

export default async function getSheetsInfoAsync({scopes, ...props}:ISProps) {
    const res = await withMustSignIn((!!scopes)?scopes:'https://www.googleapis.com/auth/spreadsheets')(getSheetsInfoGAPIAsync)(props);

    return res;
}