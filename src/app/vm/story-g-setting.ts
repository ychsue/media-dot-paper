import { IFrameBase } from "./i-frame-base";
import { SSutterParameters } from "../services/speech-synthesis.service";

export class StoryGSetting implements IFrameBase {
    rate = 1;
    volume = 1;
    utterPara = new SSutterParameters();
}
