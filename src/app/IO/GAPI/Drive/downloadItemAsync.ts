import { withMustSignIn } from "../withMustSignIn";

interface IProps {
   fileId:string
}

async function downloadItemGAPIAsync({fileId}:IProps) {
   const download = await gapi.client.drive.files.get({fileId, alt:'media'}); 
   // The data is in {body}
   return download;
}

export default async function downloadItemAsync(props:IProps) {
   const download = await withMustSignIn(
      "https://www.googleapis.com/auth/drive"
      )(downloadItemGAPIAsync)(props);
  return download;
}