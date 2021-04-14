import { IWithMustSignIn, withMustSignIn } from "../withMustSignIn";

interface IProps {
    range: string,
    spreadsheetId: string
}

interface IOProps extends IProps, IWithMustSignIn {
}

export default async function getCellsValueAsync(props: IOProps) {
    var { scopes, signInWithClick, grantWithClick, mustLoadScopes, ...propsIn } = props;
    scopes = (!!scopes) ? scopes : 'https://www.googleapis.com/auth/spreadsheets';
    var res = await withMustSignIn({ scopes, signInWithClick, grantWithClick, mustLoadScopes })(
        getCellsValueGAPIAsync)(propsIn);

    return res;

}

async function getCellsValueGAPIAsync({ range, spreadsheetId }: IProps) {
    const res = await gapi.client.sheets.spreadsheets.values.get({
        range,
        spreadsheetId
    });

    if (res.status !== 200) throw new Error(`Status: ${res.status}, Text: ${res.statusText}`);

    return res;
}