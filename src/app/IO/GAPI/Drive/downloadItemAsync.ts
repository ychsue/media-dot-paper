import { IWithMustSignIn, withMustSignIn } from "../withMustSignIn";

interface IProps {
   fileId: string,
}

interface IOProps extends IProps, IWithMustSignIn { }

async function downloadItemGAPIAsync({ fileId }: IProps) {
   const download = await gapi.client.drive.files.get({ fileId, alt: 'media' });
   // The data is in {body}
   return download;
}

export default async function downloadItemAsync(props: IOProps) {
   var { scopes, signInWithClick, grantWithClick, mustLoadScopes, ...propsIn } = props;
   scopes = (!!scopes) ? scopes : "https://www.googleapis.com/auth/drive";
   var download = await withMustSignIn({ scopes, signInWithClick, grantWithClick, mustLoadScopes })(
      downloadItemGAPIAsync)(propsIn);
   return download;
}