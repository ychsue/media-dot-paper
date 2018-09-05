interface Window {
    plugins: WindowPlugins;
}

interface WindowPlugins {
    socialsharing: socialsharing;
}

interface socialsharing {
    shareWithOptions(options: any, onSuccess: (result: any) => void, onError: (msg:string) => void);
    
    share(msg: string, subject?: string, file?: string|Array<string>, url?: string, onSuccess?: (result: any) => void, onError?: (msg:string) => void );

    available(action: (isAvailable: boolean) => void);
}