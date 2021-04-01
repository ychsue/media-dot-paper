import { withMustSignIn } from "../withMustSignIn";
import batchUpdateAsync from "./batchUpdateAsync";

interface IProps {
    spreadsheetId: string,
    sheetId?: number,
    frozenColumnCount?: number,
    frozenRowCount?: number,
    tabColor?: gapi.client.sheets.Color,
    title?: string,
    fields?: string,
}

interface IOProps extends IProps{
    scopes?: string,
}

export default async function setSheetPropAsync({scopes, 
    spreadsheetId, sheetId, fields, frozenRowCount, frozenColumnCount, title, tabColor
}:IOProps) {
    const requests : gapi.client.sheets.Request[] = [];
    requests.push({
        updateSheetProperties: {
            properties: {
                sheetId,
                gridProperties: {
                    frozenColumnCount,
                    frozenRowCount,
                },
                tabColor,
                title,
            },
            fields
        }
    });
    
    const res = await batchUpdateAsync({
        scopes, 
        spreadsheetId,
        resource: {
            requests
        }
    });

    return res;
}
