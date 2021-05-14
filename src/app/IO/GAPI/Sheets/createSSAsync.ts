import { IWithMustSignIn, withMustSignIn } from "../withMustSignIn";

interface IProps {
    title: string,
    parents?: string,
}

interface IOProps extends IProps, IWithMustSignIn {
}

export default async function createSSAsync(props: IOProps) {
    var { scopes, signInWithClick, grantWithClick, mustLoadScopes, ...propsIn } = props;
    scopes = !!scopes
      ? scopes
      : "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets";
    var res = await withMustSignIn({ scopes, signInWithClick, grantWithClick, mustLoadScopes })(
        createSSGAPIAsync)(propsIn);
    return res;
}

async function createSSGAPIAsync({ title, parents }: IProps) {
    const res = await gapi.client.sheets.spreadsheets.create({
        resource: {
            properties: { title }
        }
    });

    if (res.status != 200) throw new Error(`createSSAsync Error status: ${res.status}, text: ${res.statusText}`);

    if (!!parents) {
        const res2 = await gapi.client.drive.files.update({
            fileId: res.result.spreadsheetId,
            addParents: parents,
            resource: undefined
        });
    }

    return res;
}