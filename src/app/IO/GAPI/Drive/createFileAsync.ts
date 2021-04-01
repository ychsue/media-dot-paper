import { withMustSignIn } from "../withMustSignIn";

interface IPropIn {
    name: string,
    blob?: Blob,
    mimeType?: string,
    parents?: string[]
}

async function createFileGAPIAsync({name, blob, mimeType, parents}: IPropIn){
    // 取自 https://tanaikech.github.io/2018/08/13/upload-files-to-google-drive-using-javascript/
    // * [2021-03-16 09:50] file 即 blob，此段只在 blob 沒提供時初始化用
    var fileContent = "sample text";
    var file = (!!blob)? blob: new Blob([fileContent],{type: mimeType});

    var metadata = {
        name,
        mimeType,
        parents
    }
    
    // var accessToken = gapi.auth.getToken(); // 這有問題，因為這是auth2
    // From https://stackoverflow.com/questions/38751262/gapi-auth2-can-not-get-access-token
    var response = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(true)
    if (!!!response) throw Error("Cannot get access token");

    var accessToken = response.access_token;

    const form  = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
    form.append('media',file);

    var res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id', {
        method: 'POST',
        headers: new Headers({'Authorization': 'Bearer '+accessToken}),
        body: form,
    });

    const json_result = await res.json();
    if (!!json_result.error) throw Error(json_result.error);

    return json_result;
}

export default async function createFileAsync(props: IPropIn) {
    var res = await withMustSignIn("https://www.googleapis.com/auth/drive")(createFileGAPIAsync)(props);

    return res;
}