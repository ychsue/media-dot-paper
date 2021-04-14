import { IWithMustSignIn, withMustSignIn } from "../withMustSignIn";

interface IProps {
    range: string,
    spreadsheetId: string,
    resource: gapi.client.sheets.ValueRange // {values: any[][]}
    valueInputOption?: string
}

interface IOProps extends IProps, IWithMustSignIn {
}

export default async function setCellsValueAsync(props: IOProps) {
    var { scopes, signInWithClick, grantWithClick, mustLoadScopes, ...propsIn } = props;
    scopes = (!!scopes) ? scopes : 'https://www.googleapis.com/auth/spreadsheets';
    var res = await withMustSignIn({ scopes, signInWithClick, grantWithClick, mustLoadScopes })(
        setCellsValueGAPIAsync)(propsIn);

    return res;
}

async function setCellsValueGAPIAsync({ range, spreadsheetId, resource, valueInputOption = `RAW` }: IProps) {
    const res = await gapi.client.sheets.spreadsheets.values.update({
        range,
        spreadsheetId,
        resource,
        valueInputOption
    });

    if (res.status !== 200) throw new Error(`setCellsValueAsync Error status: ${res.status}, text: ${res.statusText}`);

    return res;
}