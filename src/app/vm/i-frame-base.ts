import { SSutterParameters } from "../services/speech-synthesis.service";

export interface IFrameBase {
    rate: number;
    volume: number;
    utterPara: SSutterParameters;
}
