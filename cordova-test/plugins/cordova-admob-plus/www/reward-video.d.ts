import { AdBase, AdUnitIDOption, TestIds } from './base';
interface IRewardVideoPrepareOptions {
    id?: AdUnitIDOption;
}
export default class RewardVideo extends AdBase {
    protected testIdForAndroid: TestIds;
    protected testIdForIOS: TestIds;
    isReady(): Promise<{}>;
    load(opts?: IRewardVideoPrepareOptions): Promise<void>;
    show(): Promise<{}>;
}
export {};
