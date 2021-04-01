import { withMustSignIn } from "../withMustSignIn";

export default async function getInfoFromIdAsync(props:IProps) {
    const result = await withMustSignIn("https://www.googleapis.com/auth/drive.metadata.readonly ")(getInfoFromIdGAPIAsync)(props);
    return result;
}

interface IProps {
    fileId: string,
    fields?: string //"id, name"
}

async function getInfoFromIdGAPIAsync(props: IProps) {
    const result = await gapi.client.drive.files.get(props);
    
    if(result.status !=200) throw new Error(JSON.stringify(result.result));

    return result;
}
