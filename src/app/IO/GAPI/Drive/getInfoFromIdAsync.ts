import { IWithMustSignIn, withMustSignIn } from "../withMustSignIn";

export default async function getInfoFromIdAsync(props: IOProps) {
    var { scopes, signInWithClick, grantWithClick, mustLoadScopes, ...propsIn } = props;
    scopes = (!!scopes) ? scopes : "https://www.googleapis.com/auth/drive.metadata.readonly ";
    var result = await withMustSignIn({ scopes, signInWithClick, grantWithClick, mustLoadScopes })(
        getInfoFromIdGAPIAsync)(propsIn);
    return result;
}

interface IProps {
    fileId: string,
    fields?: string, //"id, name"
}

interface IOProps extends IWithMustSignIn, IProps { }

async function getInfoFromIdGAPIAsync(props: IProps) {
    const result = await gapi.client.drive.files.get(props);

    if (result.status != 200) throw new Error(JSON.stringify(result.result));

    return result;
}
