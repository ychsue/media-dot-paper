interface CordovaPlugins {
    clipboard: Clipboard;
}

interface Clipboard {
    copy(text: string, onSuccess: (data: any) => void, onError: (data: any) => void)

    paste(onSuccess: (data: any) => void, onError: (data: any) => void)

    clear(onSuccess: (data: any) => void, onError: (data: any) => void)
}

// declare module 'cordova';