export default async function confirmAsync(txt: string) {
  if (!!window.Windows === true) {
    const msg = new Windows.UI.Popups.MessageDialog(txt);
    const action$ = new Promise((res, rej) => {
      msg.commands.append(
        new Windows.UI.Popups.UICommand("No", (c) => {
          return res(false);
        })
      );
      msg.commands.append(
        new Windows.UI.Popups.UICommand("Yes", (c) => {
          return res(true);
        })
      );
      msg.defaultCommandIndex = 1;
      msg.cancelCommandIndex = 0;
      msg.showAsync();
    });
    return await action$;
  } else {
    return confirm(txt);
  }
}
