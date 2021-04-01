export default function isSignedIn() {
    return gapi.auth2.getAuthInstance().isSignedIn.get();
}