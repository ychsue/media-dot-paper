import initAsync from "./initAsync";

export default async function signInAsync() {
  if (!!!window?.gapi?.auth2) {
    await initAsync();
  }
  return await gapi.auth2.getAuthInstance().signIn();
}
