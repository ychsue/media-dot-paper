import { SSutterParameters } from "../services/speech-synthesis.service";
import { IFrameBase } from "./i-frame-base";

export class AFrame implements IFrameBase {
    name: string;
    pseudopath = '/';

    genTime: number;
    colorR: number;
    colorG: number;
    colorB: number;
    colorA = 0.9;
    top = 0.5; // 0 ~ ${1-height}
    height = 0.3;

    start = 0;
    end = 0;

    rate = 1;
    volume = 1;

    subtitle = '';

    isUtter = false;
    utterPara = new SSutterParameters();

    constructor () {
        this.colorR = Math.round(Math.random() * 200 + 20);
        this.colorG = Math.round(Math.random() * 200 + 20);
        this.colorB = Math.round(Math.random() * 200 + 20);
        this.genTime = Date.now();
        return this;
    }
}
