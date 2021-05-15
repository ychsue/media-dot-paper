import { take } from "rxjs/operators";
import { Gv2googleService } from "../gv2google.service";

export default async function setexport2GDFolderIdAsync(v: string) {
  const self = this as Gv2googleService;
  const usr = await self.gapiService.service.userProfile$
    .pipe(take(1))
    .toPromise();
  const gUser = self.gvService.googleUsers.find((x) => x.id === usr?.id);
  if (!!gUser) {
    gUser.setFId = v;
  } else {
    self.gvService.googleUsers.push({
      name: usr.name,
      id: usr.id,
      allowSet: "Yes",
      setFId: v,
    });
  }
}
