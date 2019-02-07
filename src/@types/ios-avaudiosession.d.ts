interface Window {
    AVAudioSession: AVAudioSession;
}

interface AVAudioSession {
    getCategory: (cb: (any) => void) => void;
    getCategoryOptions: (cb: (any) => void) => void;
    setCategory: (category: any, success: () => void, error: (any) => void) => void;
    setCategoryWithOptions: (category: any, options: any, success: () => void, error: (any) => void) => void;
    registerRouteChangedCallback: (success: (any) => void, error: (any) => void) => void;
    Categories: {
        AMBIENT: 'AVAudioSessionCategoryAmbient',
	    SOLO_AMBIENT: 'AVAudioSessionCategorySoloAmbient',
	    PLAYBACK: 'AVAudioSessionCategoryPlayback',
	    RECORD: 'AVAudioSessionCategoryRecord',
	    PLAY_AND_RECORD: 'AVAudioSessionCategoryPlayAndRecord',
	    AUDIO_PROCESSING: 'AVAudioSessionCategoryAudioProcessing',
        MULTI_ROUTE: 'AVAudioSessionCategoryMultiRoute'
    };
    CategoryOptions: {
        MIX_WITH_OTHERS: 1,
        DUCK_OTHERS: 2,
        ALLOW_BLUETOOTH: 4,
        DEFAULT_TO_SPEAKER: 8
    };
    RouteChangeReason: {
        Unknown: 0,
        NewDeviceAvailable: 1,
        OldDeviceUnavailable: 2,
        CategoryChange: 3,
        Override: 4,
        WakeFromSleep: 6,
        NoSuitableRouteForCategory: 7,
        RouteConfigurationChange: 8
    };
}