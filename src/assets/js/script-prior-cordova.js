var activatedTypes = {
    file: 'file',
    uri: 'uri',
    text: 'text' // Will be classified as an uri after decodeURIComponent
};
var output = { type: null, data: null };
window.initEventArgs = {};
// eslint-disable-next-line no-extra-boolean-cast
if (!!window.Windows) {
    window.alert = async (txt) => {
        if (!!window.winAlert) {
            window.winAlert.content = txt;
        } else {
            window.winAlert = new window.Windows.UI.Popups.MessageDialog(txt);
        }
        return await window.winAlert.showAsync();
    }
    // eslint-disable-next-line no-undef
    Windows.UI.WebUI.WebUIApplication.onactivated = function(ev) {
        output = ev;
        if (ev.detail[0].kind === 3) { // File
            // eslint-disable-next-line no-undef
            output = {
                data: MSApp.createFileFromStorageFile(ev.detail[0].files[0]),
                type: activatedTypes.file
            };
        } else if (ev.detail[0].kind === 4) { // Protocol
            output = {
                data: ev.detail[0].uri,
                type: activatedTypes.uri
            };
        }
        window.initEventArgs.activated = output;
    };
} else {
    if (!window.handleOpenURL) {
        window.handleOpenURL = function(data, inType) {
            if (!inType) {
                inType = activatedTypes.uri;
            } else if (inType === activatedTypes.text) {
                inType = activatedTypes.uri;
                data = decodeURIComponent(data);
            }
            output.type = inType;
            output.data = data;
            window.initEventArgs.activated = output;
        };
    }
}