import { tHOF, withMustSignIn } from "../withMustSignIn";

async function getFolderIdRecursivelyGAPIAsync({
  name,
  parentId,
}: {
  name: string;
  parentId?: string;
}) {
  // 1. Get the folder tree
  const fTree = name.split("/");
  let folder: gapi.client.drive.File;

  parentId = !!parentId ? parentId : "root";

  for (let i0 = 0; i0 < fTree.length; i0++) {
    const subName = fTree[i0];
    if (!!!subName) continue;
    // 1. Check whether it does exist
    const folders = await gapi.client.drive.files.list({
      fields: "files(id)",
      q: `'${parentId}' in parents and name = '${subName}'`,
    });
    if (folders?.result?.files?.length > 0) {
      folder = folders.result.files[0];
      parentId = folder.id;
    } else {
      const res = await gapi.client.drive.files.create({
        fields: "id",
        resource: {
          name: subName,
          mimeType: "application/vnd.google-apps.folder",
          parents: [parentId],
        },
      });
      folder = res.result;
      parentId = folder.id;
    }
  }

  return parentId;
}

export default async function getFolderIdRecursivelyAsync({
  name,
  grantWithClick,
  signInWithClick,
  parentId,
}: {
  name: string;
  grantWithClick?: tHOF;
  signInWithClick?: tHOF;
  parentId?: string;
}) {
  const scopes = "https://www.googleapis.com/auth/drive.readonly";
  var res = await withMustSignIn({ scopes, grantWithClick, signInWithClick })(
    getFolderIdRecursivelyGAPIAsync
  )({ name, parentId });

  return res;
}
