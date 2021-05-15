import { BehaviorSubject, from, Subject } from "rxjs";
import { map } from "rxjs/operators";

export interface IuserProfile {
  name: string;
  img: string;
  id: string;
}

export const userProfile$next = new BehaviorSubject<gapi.auth2.GoogleUser|null>(null);

export const userProfile$ = userProfile$next.pipe(map(cUser => {
  const profile: IuserProfile = { name: "", img: "", id: "" };
  if(!!cUser) {
      const p = cUser.getBasicProfile();
      if(!!p) {
          profile.name = p.getName();
          profile.img = p.getImageUrl();
          profile.id = p.getId();
      }
  }
  return profile;
}));
