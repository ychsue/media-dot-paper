import { withMustSignIn } from "../withMustSignIn";

interface IProps {
    fields?: string,
    q?: string,
}

async function searchItemsGAPIAsync({q, fields}:IProps) {
    fields = (fields===undefined)?"nextPageToken, files(id,name)":fields;
    const result = await gapi.client.drive.files.list({q, fields});

    if(result.status !== 200) throw Error(JSON.stringify(result));

    return result;
}

export default async function searchItemsAsync(props:IProps) {
    const search = await withMustSignIn(
        "https://www.googleapis.com/auth/drive.appdata "+ "https://www.googleapis.com/auth/drive.metadata.readonly "+
        "https://www.googleapis.com/auth/drive.photos.readonly " +
        "https://www.googleapis.com/auth/drive.readonly"
        )(searchItemsGAPIAsync)(props);
    return search;
}