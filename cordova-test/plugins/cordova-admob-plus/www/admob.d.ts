import Banner from './banner';
import Interstitial from './interstitial';
import RewardVideo from './reward-video';
declare class AdMob {
    banner: Banner;
    interstitial: Interstitial;
    rewardVideo: RewardVideo;
    private state;
    constructor();
    setAppMuted(value: boolean): Promise<{}>;
    setAppVolume(value: number): Promise<{}>;
    setDevMode(value: boolean): void;
    private ready;
}
declare const _default: AdMob;
export default _default;
