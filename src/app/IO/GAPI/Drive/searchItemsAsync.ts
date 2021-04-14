import { IWithMustSignIn, withMustSignIn } from "../withMustSignIn";

interface IProps {
    fields?: string,
    q?: string,
}

interface IOProps extends IProps, IWithMustSignIn { }

async function searchItemsGAPIAsync({ q, fields }: IProps) {
    fields = (fields === undefined) ? "nextPageToken, files(id,name)" : fields;
    const result = await gapi.client.drive.files.list({ q, fields });

    if (result.status !== 200) throw Error(JSON.stringify(result));

    return result;
}

export default async function searchItemsAsync(props: IOProps) {
    var { scopes, signInWithClick, grantWithClick, mustLoadScopes, ...propsIn } = props;
    scopes = (!!scopes) ? scopes :
        "https://www.googleapis.com/auth/drive.appdata " +
        "https://www.googleapis.com/auth/drive.metadata.readonly " +
        "https://www.googleapis.com/auth/drive.photos.readonly " +
        "https://www.googleapis.com/auth/drive.readonly";
    var search = await withMustSignIn({ scopes, signInWithClick, grantWithClick, mustLoadScopes })(
        searchItemsGAPIAsync)(propsIn);
    return search;
}