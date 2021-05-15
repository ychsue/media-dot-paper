import { take } from "rxjs/operators";
import { Gv2googleService } from "../gv2google.service";

export default async function setexport2GDFolderId(v: string) {
  const self = this as Gv2googleService;
  const usr = await self.gapiService.service.userProfile$
    .pipe(take(1))
    .toPromise();
  const gUser = self.gvService.googleUsers.find((x) => x.name === usr?.name);
  if (!!gUser) {
    gUser.setFId = v;
  } else {
    this.googleUsers.push({ name: usr.name, allowSet: "Yes", setFId: v });
  }
}
