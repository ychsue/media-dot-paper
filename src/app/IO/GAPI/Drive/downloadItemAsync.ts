import getAccessToken from "../getAccessToken";
import { IWithMustSignIn, withMustSignIn } from "../withMustSignIn";

interface IProps {
  fileId: string;
}

interface IOProps extends IProps, IWithMustSignIn {}

async function downloadItemGAPIAsync({ fileId }: IProps) {
  // const download = await gapi.client.drive.files.get({ fileId, alt: 'media' });
  // // The data is in {body}
  // return download;
  const accessToken = getAccessToken();
  const res = await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
    {
      method: "GET",
      headers: new Headers({ Authorization: "Bearer " + accessToken }),
    }
  );

  if (res.status === 200) {
    return await res.blob();
  } else {
    throw new Error(
      `Error: 無法下載 ${fileId}: ${res.status}:${res.statusText}`
    );
  }
}

export default async function downloadItemAsync(props: IOProps) {
  var {
    scopes,
    signInWithClick,
    grantWithClick,
    mustLoadScopes,
    ...propsIn
  } = props;
  scopes = !!scopes ? scopes : "https://www.googleapis.com/auth/drive.readonly";
  var download = await withMustSignIn({
    scopes,
    signInWithClick,
    grantWithClick,
    mustLoadScopes,
  })(downloadItemGAPIAsync)(propsIn);
  return download;
}
