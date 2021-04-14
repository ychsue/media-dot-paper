import { IWithMustSignIn, withMustSignIn } from "../withMustSignIn";

interface IProps {
    spreadsheetId: string,
    fields?: string,
}

interface IOProps extends IProps, IWithMustSignIn {
}

async function getSheetsInfoGAPIAsync({ spreadsheetId, fields = 'sheets' }: IProps) {

    const res = await gapi.client.sheets.spreadsheets.get({
        spreadsheetId,
        fields
    });

    if (res.status !== 200) throw new Error(`status: ${res.status}, text: ${res.statusText}`);

    return res;
}

export default async function getSheetsInfoAsync(props: IOProps) {
    var { scopes, signInWithClick, grantWithClick, mustLoadScopes, ...propsIn } = props;
    scopes = (!!scopes) ? scopes : 'https://www.googleapis.com/auth/spreadsheets';
    var res = await withMustSignIn({ scopes, signInWithClick, grantWithClick, mustLoadScopes })(
        getSheetsInfoGAPIAsync)(propsIn);

    return res;
}