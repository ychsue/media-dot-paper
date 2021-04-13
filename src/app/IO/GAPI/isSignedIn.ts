export default function isSignedIn() {
  if (!!!window?.gapi?.auth2) return false;
  return gapi.auth2.getAuthInstance().isSignedIn.get();
}
