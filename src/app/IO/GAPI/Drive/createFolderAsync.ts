import { tHOF, withMustSignIn } from "../withMustSignIn";

async function createFolderGAPIAsync(name: string) {
    const folder = await gapi.client.drive.files.create({
        fields: 'id',
        resource: {
            'name': name,
            'mimeType': 'application/vnd.google-apps.folder'
        }
    });
    return folder;
}

export default async function createFolderAsync(name: string, grantWithClick?: tHOF, signInWithClick?: tHOF) {
    const scopes = "https://www.googleapis.com/auth/drive";
    var res = await withMustSignIn({ scopes, grantWithClick, signInWithClick })(createFolderGAPIAsync)(name);

    return res;
}