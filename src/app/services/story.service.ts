import { Injectable } from "@angular/core";
import { PlayerType } from "../vm/player-type.enum";
import { AFrame } from "../vm/a-frame";
import { PageTextsService } from "./page-texts.service";
import { DbService } from "./db.service";
import { StoryGSetting } from "../vm/story-g-setting";
import { IStory } from "../vm/story";

@Injectable({
  providedIn: "root",
})
export class StoryService {
  constructor(private db: DbService) {}

  stringifyAStory(story: IStory): string {
    return encodeURI(JSON.stringify(story));
  }

  getAStoryFromString(stJson: string): IStory {
    let story: IStory = null;
    try {
      const data = stJson.indexOf(`%7B`) === 0 ? decodeURI(stJson) : stJson;
      story = JSON.parse(data);
      if (!!story === false || !!story.viewTime === false) {
        story = null; // Since it is not what I want, clean it up.
      }
    } catch (error) {
      story = null;
    }
    return story;
  }

  async upsertAStoryAsync(story: IStory) {
    if (!!story) {
      const bufStory = Object.assign({}, story);
      // * [2018-10-15 11:43] Clean up the "voice" part which is related to the speechSynthesis and it will cause an exception.
      if (
        !!bufStory.gSetting &&
        !!bufStory.gSetting.utterPara &&
        !!bufStory.gSetting.utterPara.voice
      ) {
        bufStory.gSetting = Object.assign({}, story.gSetting);
        bufStory.gSetting.utterPara = Object.assign(
          {},
          story.gSetting.utterPara
        );
        delete bufStory.gSetting.utterPara.voice;
      }
      if (!!bufStory.frames && bufStory.frames.length !== 0) {
        bufStory.frames = Object.assign([], bufStory.frames);
        for (let i0 = 0; i0 < bufStory.frames.length; i0++) {
          const element = Object.assign({}, bufStory.frames[i0]);
          if (!!element.utterPara && !!element.utterPara.voice) {
            element.utterPara = Object.assign({}, element.utterPara);
            delete element.utterPara.voice;
            bufStory.frames[i0] = element;
          }
        }
      }

      return await this.db.upsertAsync(DbService.storyTableName, bufStory);
    } else {
      return;
    }
  }
}
