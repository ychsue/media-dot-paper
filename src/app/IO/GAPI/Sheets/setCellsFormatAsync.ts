import { withMustSignIn } from "../withMustSignIn";
import batchUpdateAsync from "./batchUpdateAsync";

interface IProps {
    spreadsheetId: string,
    range: gapi.client.sheets.GridRange,
    fields?: string,
    userEnteredFormat?: gapi.client.sheets.CellFormat,
    userEnteredValue?:gapi.client.sheets.ExtendedValue,
}

interface IOProps extends IProps{
    scopes?: string,
}

export default async function setCellsFormatAsync({scopes, spreadsheetId, range, fields, userEnteredFormat, userEnteredValue}:IOProps) {
    const requests : gapi.client.sheets.Request[] = [];
    requests.push({
        repeatCell: {
            range,
            fields,
            cell:{
                userEnteredFormat,
                userEnteredValue
            }
        }
    });
    const res = await batchUpdateAsync({
        spreadsheetId,
        resource: {
            requests
        }
    });

    return res;
}