import { Events, NativeActions } from './constants';
import { AdUnitIDOption } from './shared';
import AdMobState from './state';
export { AdUnitIDOption, Events, NativeActions };
export declare const enum Platforms {
    android = "android",
    ios = "ios"
}
export declare const enum TestIds {
    banner_android = "ca-app-pub-3940256099942544/6300978111",
    interstitial_android = "ca-app-pub-3940256099942544/1033173712",
    reward_video_android = "ca-app-pub-3940256099942544/5224354917",
    banner_ios = "ca-app-pub-3940256099942544/2934735716",
    interstitial_ios = "ca-app-pub-3940256099942544/4411468910",
    reward_video_ios = "ca-app-pub-3940256099942544/1712485313"
}
export declare function execAsync(action: NativeActions, args?: any[]): Promise<{}>;
export declare function fireDocumentEvent(eventName: string, data?: null): void;
export declare function waitEvent(successEvent: any, failEvent?: string): Promise<Event>;
export declare class AdBase {
    protected state: AdMobState;
    protected testIdForAndroid: any;
    protected testIdForIOS: any;
    constructor(state: AdMobState);
    protected readonly testAdUnitID: string;
    protected resolveAdUnitID(adUnitID?: AdUnitIDOption): string;
}
