export default function signInAsync() {
    return gapi.auth2.getAuthInstance().signIn();
}