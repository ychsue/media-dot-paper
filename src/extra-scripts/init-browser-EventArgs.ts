import { protocolCheck } from "./protocolCheck";

export default function initBrowserEventArgs() {
  window["protocolCheck"] = protocolCheck;

  let stUrl = window.location.href;
  const ind = stUrl.indexOf("?");
  if (ind > 0) {
    var para = stUrl.substr(ind + 1);
    // * [2021-04-09 21:44] Checking whether it is from Google openWith
    const matched = decodeURIComponent(stUrl).match(/state=([^\&]*)/i);
    if (!!matched && matched.length >= 2) {
      try {
        var json = JSON.parse(matched[1]);
        if (json.action === "open") {
          const keyIds = Object.keys(json).find(
            (v) => v.toLowerCase().indexOf(`ids`) >= 0
          );
          const ids: Array<string> = json[keyIds];
          if (ids.length === 1) {
            /* ******************** TODO ************************* */
            para = `https://drive.google.com/open?id=${ids[0]}&ismdp=1`;
          }
        }
      } catch (error) {}
    }

    stUrl = "mdpyc:///" + para;

    // * [2019-03-15 14:20] Used to tell angular that there is an input from onactivated event
    window["initEventArgs"] = {};
    window["initEventArgs"].activated = { type: "uri", data: stUrl };

    setTimeout(() => {
      window["protocolCheck"](
        stUrl,
        // _ => alert('out of this protocol' + stUrl)
        (_) => {}
      );
    }, 0);
  }
}
