import getAccessToken from "../getAccessToken";
import initAsync from "../initAsync";
import { IWithMustSignIn, withMustSignIn } from "../withMustSignIn";

interface IPropIn {
  name: string;
  blob?: Blob;
  mimeType?: string;
  parents?: string[];
}

interface IOProps extends IPropIn, IWithMustSignIn {}

async function createFileGAPIAsync({ name, blob, mimeType, parents }: IPropIn) {
  // 取自 https://tanaikech.github.io/2018/08/13/upload-files-to-google-drive-using-javascript/
  // * [2021-03-16 09:50] file 即 blob，此段只在 blob 沒提供時初始化用
  var fileContent = "sample text";
  var file = !!blob ? blob : new Blob([fileContent], { type: mimeType });

  var metadata = {
    name,
    mimeType,
    parents,
  };

  // var accessToken = gapi.auth.getToken(); // 這有問題，因為這是auth2
  // From https://stackoverflow.com/questions/38751262/gapi-auth2-can-not-get-access-token
  if (!!!window?.gapi?.auth2) {
    await initAsync();
  }
  const accessToken = getAccessToken();

  const form = new FormData();
  form.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], { type: "application/json" })
  );
  form.append("media", file);

  var res = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id",
    {
      method: "POST",
      headers: new Headers({ Authorization: "Bearer " + accessToken }),
      body: form,
    }
  );

  const json_result = await res.json();
  if (!!json_result.error) throw Error(json_result.error);

  return json_result;
}

export default async function createFileAsync(props: IOProps) {
  var {
    scopes,
    signInWithClick,
    grantWithClick,
    mustLoadScopes,
    ...propsIn
  } = props;
  scopes = !!scopes ? scopes : "https://www.googleapis.com/auth/drive.file";
  var res = await withMustSignIn({
    scopes,
    signInWithClick,
    grantWithClick,
    mustLoadScopes,
  })(createFileGAPIAsync)(propsIn);

  return res;
}
