export default function signOutAsync() {
  if (!!!window?.gapi?.auth2) return;
  return gapi.auth2.getAuthInstance().signOut();
}
