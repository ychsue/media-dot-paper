import { IFrameBase } from "./i-frame-base";
import { SSutterParameters } from "../services/speech-synthesis.service";

export class StoryGSetting implements IFrameBase {
    rate = 1;
    volume = 1;
    utterPara = new SSutterParameters();

    mVPType = mediaVPType.main;
    mPlayType = mediaPlayType.timeline;
}

export enum utterType {
    none,
    byEach,
    all
  }

  export enum mediaVPType {
    mdp,
    main
  }

  export enum mediaPlayType {
    timeline,
    mdp
  }
