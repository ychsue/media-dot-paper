import { timer } from "rxjs";
import { filter, take } from "rxjs/operators";
import { isAuthLoaded$ } from "./isAuthLoaded$";

export default function signIn2Async(
  id: string,
  setIt?: {
    scope?: string;
    width?: number;
    height?: number;
    longtitle?: boolean;
    theme?: string;
  }
) {
  let option = {
    scope: "profile https://www.googleapis.com/auth/drive.install",
    width: 240,
    height: 50,
    longtitle: true,
    theme: "dark",
    ...setIt,
  };
  return new Promise(
    (
      res: (user: gapi.auth2.GoogleUser) => void,
      rej: (reason: { error: string }) => void
    ) => {
      isAuthLoaded$
        .pipe(
          filter((is) => is),
          take(1)
        )
        .subscribe((_) => {
          timer(10, 1000)
            .pipe(
              filter((i0) => !!gapi?.signin2 || i0 > 5),
              take(1)
            )
            .subscribe((_) => {
              gapi.signin2.render("g-signin2", {
                ...option,
                onsuccess: res,
                onfailure: rej,
              });
            });
        });
    }
  );
}
