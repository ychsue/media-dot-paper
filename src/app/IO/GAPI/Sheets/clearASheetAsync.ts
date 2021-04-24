import { IWithMustSignIn, withMustSignIn } from "../withMustSignIn";

interface IProps {
    spreadsheetId: string,
    range: string,
}

interface IOProps extends IProps, IWithMustSignIn {
}

export default async function clearASheetAsync(props: IOProps) {
    var { scopes, signInWithClick, grantWithClick, mustLoadScopes, ...propsIn } = props;
    scopes = (!!scopes) ? scopes : 'https://www.googleapis.com/auth/spreadsheets';
    var res = await withMustSignIn({ scopes, signInWithClick, grantWithClick, mustLoadScopes })(
        clearASheetGAPIAsync)(propsIn);
    return res;
}

async function clearASheetGAPIAsync({ spreadsheetId, range }: IProps) {
    const res = await gapi.client.sheets.spreadsheets.values.clear({
        spreadsheetId,
        range,
        resource: {

        }
    });

    if (res.status != 200) throw new Error(`createSSAsync Error status: ${res.status}, text: ${res.statusText}`);

    return res;
}