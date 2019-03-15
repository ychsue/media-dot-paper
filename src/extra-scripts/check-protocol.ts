let stUrl = window.location.href;
const ind = stUrl.indexOf('?');
if ( ind > 0) {
    stUrl = 'mdpyc:///' + stUrl.substr(ind + 1);

    // * [2019-03-15 14:20] Used to tell angular that there is an input from onactivated event
    window['initEventArgs'] = {};
    window['initEventArgs'].activated = {type: 'uri', data: stUrl};

    setTimeout(() => {
        window['protocolCheck'](
            stUrl,
            // _ => alert('out of this protocol' + stUrl)
            _ => {}
            );
    }, 0);
}
