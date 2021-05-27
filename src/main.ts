import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";
import { initAsync as initGAPIAsync } from "./app/IO/GAPI";
import initBrowserEventArgs from "./extra-scripts/init-browser-EventArgs";
import { protocolCheck } from "./extra-scripts/protocolCheck";

initGAPIAsync();

window["protocolCheck"] = protocolCheck;

if (/^https?/i.test(window?.location?.protocol) && !!!window.Windows) {
  initBrowserEventArgs();
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.log(`Main.ts Error: ${err.message}`));
