import { AdBase, AdUnitIDOption, TestIds } from './base';
interface IBannerShowOptions {
    id?: AdUnitIDOption;
}
export default class Banner extends AdBase {
    protected testIdForAndroid: TestIds;
    protected testIdForIOS: TestIds;
    show(opts?: IBannerShowOptions): Promise<{}>;
    hide(): Promise<{}>;
}
export {};
