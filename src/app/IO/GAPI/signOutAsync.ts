export default function signOutAsync() {
    return gapi.auth2.getAuthInstance().signOut();
}