var activatedTypes = {
    file: 'file',
    uri: 'uri',
};
var output = { type: null, data: null };
window.initEventArgs = {};
// eslint-disable-next-line no-extra-boolean-cast
if (!!window.Windows) {
    // eslint-disable-next-line no-undef
    Windows.UI.WebUI.WebUIApplication.onactivated = function(ev) {
        output = ev;
        if (ev.detail[0].kind === 3) { // File
            // eslint-disable-next-line no-undef
            output.dtat = MSApp.createFileFromStorageFile(ev.detail[0].files[0]);
            output.type = activatedTypes.file;
        } else if (ev.detail[0] === 4) { // Protocol
            output.data = ev.detail[0].uri;
            output.type = activatedTypes.uri;
        }
        window.initEventArgs.activated = output;
    };
} else {
    if (!window.handleOpenURL) {
        window.handleOpenURL = function(data, inType) {
            if (!inType) { inType = activatedTypes.uri; }
            output.type = inType;
            output.data = data;
            window.initEventArgs.activated = output;
        };
    }
}