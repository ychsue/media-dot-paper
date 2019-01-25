interface Window {
    plugins: WindowPlugins;
}

interface WindowPlugins {
    audioRecorderAPI: audioRecorderAPI;
}

interface audioRecorderAPI {
    record(onSuccess: (result: any) => void, onError: (msg:string) => void, duration?: number);
    
    stop(onSuccess?: (result: any) => void, onError?: (msg:string) => void );

    playback(onSuccess?: (result: any) => void, onError?: (msg:string) => void );
}