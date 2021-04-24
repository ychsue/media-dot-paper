import batchUpdateAsync from "./batchUpdateAsync";

interface IProps {
    spreadsheetId: string,
    sheetId: number,
    title?: string,
    properties?: gapi.client.sheets.SheetProperties,
    fields?: string
}

interface IOProps extends IProps {
    scopes?: string,
}

export default async function renameASheetAsync({ scopes,
    spreadsheetId, sheetId, title, properties, fields = "title"
}: IOProps) {
    const requests: gapi.client.sheets.Request[] = [];
    requests.push({
        updateSheetProperties: {
            properties: {
                ...properties, sheetId, title
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
