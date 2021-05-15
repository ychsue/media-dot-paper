import { take } from "rxjs/operators";
import { Gv2googleService } from "../gv2google.service";

export default async function getExport2GDFolderIdAsync() {
  const self = this as Gv2googleService;
  const usr = await self.gapiService.service.userProfile$
    .pipe(take(1))
    .toPromise();
  const gUser = self.gvService.googleUsers.find((x) => x.id === usr?.id);
  return gUser?.allowSet === "Yes" ? gUser.setFId : null;
}
