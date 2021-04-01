import batchUpdateAsync from "./batchUpdateAsync";

interface IOProps {
    scopes?: string,

    spreadsheetId: string,
    sheetId: number,
    dimension: 'ROWS'|'COLUMNS',
    startIndex: number,
    endIndex: number,
}

export default async function groupDimAsync({scopes, spreadsheetId, sheetId, dimension, startIndex, endIndex}: IOProps) {
    const res = await batchUpdateAsync({
        scopes,
        spreadsheetId,
        resource: {
            requests: [{
                addDimensionGroup: {
                    range: {
                        sheetId,
                         dimension,
                         startIndex,
                         endIndex,
                    }
                }
            }]
        }
    });

    return res;
}