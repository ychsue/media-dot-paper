import { withMustSignIn } from "../withMustSignIn";

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

export default async function createFolderAsync(name: string) {
    var res =await withMustSignIn("https://www.googleapis.com/auth/drive")(createFolderGAPIAsync)(name);

    return res;
}