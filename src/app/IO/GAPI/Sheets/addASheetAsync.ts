import batchUpdateAsync from "./batchUpdateAsync";

interface IProps {
    spreadsheetId: string,
    title?: string,
    properties?: gapi.client.sheets.SheetProperties,
}

interface IOProps extends IProps {
    scopes?: string,
}

export default async function addASheetAsync({ scopes,
    spreadsheetId, title, properties
}: IOProps) {
    const requests: gapi.client.sheets.Request[] = [];
    requests.push({
        addSheet: {
            properties: {
                ...properties, title
            }
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
