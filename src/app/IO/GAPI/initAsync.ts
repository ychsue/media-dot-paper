import { last } from "rxjs/operators";
import {
  IuserProfile,
  userProfile$,
  userProfile$next,
} from "./User/userProfile$";
import { signInStatus$ } from "./signInStatus$";
import isSignedIn from "./isSignedIn";
import { isLoaded, setIsLoaded } from "./isLoaded";
import { isAuthLoaded$ } from "./isAuthLoaded$";
import { googleAPIkey, googleClientId } from "src/app/privateValues";

export default async function initAsync() {
  // * [2021-03-09 16:46] Load gapi at first
  if (!!!window?.gapi) {
    await new Promise((res, rej) => {
      var uiEle = document.getElementById("gapiScript");
      if (uiEle) {
        uiEle.onload = (ev: Event) => {
          if (!!!isLoaded) {
            res(ev);
            setIsLoaded(true);
          }
        };
        uiEle.addEventListener("readystatechange", (e) => {
          if (!!!isLoaded && (uiEle as any)["readyState"] === "complete") {
            res(e);
            setIsLoaded(true);
          }
        });
      }
    });
  } else {
    setIsLoaded(true);
  }

  // * [2021-03-09 16:47] Load the libraries client and auth2
  await new Promise((res: gapi.CallbackOrConfig, rej) => {
    gapi.load("client:signin2:auth2", res);
  });

  // * [2021-03-09 16:47] Initialize the libraries
  await gapi.client.init({
    apiKey: googleAPIkey,
    clientId: googleClientId,
    discoveryDocs: [
      "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
      "https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest",
    ],
    scope: "profile https://www.googleapis.com/auth/drive.install",
  });

  isAuthLoaded$.next(true);

  // * [2021-03-09 16:48] Listen to the signedIn state
  const Auth = gapi.auth2.getAuthInstance();
  Auth.isSignedIn.listen((b) => {
    signInStatus$.next(b);
    if (!!!b) {
      userProfile$next.next(null);
    }
  }); //不能直接 listen(....next); 因為這樣的話，其 this 會指向 undefined，這樣是錯的
  signInStatus$.next(isSignedIn());

  Auth.currentUser.listen((user) => {
    userProfile$next.next(user);
  });

  if (isSignedIn()) {
    userProfile$next.next(Auth.currentUser.get());
  }
}
