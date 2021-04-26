export default function getAccessToken() {
    const response = gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .getAuthResponse(true);
    if (!!!response) throw Error("Cannot get access token");

    const accessToken = response.access_token;
    return accessToken;
}