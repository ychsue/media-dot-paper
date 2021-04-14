import { IWithMustSignIn, withMustSignIn } from "../withMustSignIn";

interface IProps {
    title: string
}

interface IOProps extends IProps, IWithMustSignIn {
}

export default async function createSSAsync(props: IOProps) {
    var { scopes, signInWithClick, grantWithClick, mustLoadScopes, ...propsIn } = props;
    scopes = (!!scopes) ? scopes : 'https://www.googleapis.com/auth/spreadsheets';
    var res = await withMustSignIn({ scopes, signInWithClick, grantWithClick, mustLoadScopes })(
        createSSGAPIAsync)(propsIn);
    return res;
}

async function createSSGAPIAsync({ title }: IProps) {
    const res = await gapi.client.sheets.spreadsheets.create({
        resource: {
            properties: { title }
        }
    });

    if (res.status != 200) throw new Error(`createSSAsync Error status: ${res.status}, text: ${res.statusText}`);

    return res;
}