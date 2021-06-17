import { service } from "src/app/IO/YouTube";
import { YoutubeService } from "../youtube.service";
import { IMyCaptionTrack } from "./typeDefs";

export default async function _getCTracks$$(vid: string) {
  const self = this as YoutubeService;

  const stInfo = await service.getVideoInfo$$(vid);
  if (!!stInfo === false) {
    if (!!window?.Windows) {
      alert(
        `Error of _getCTracks$$. Cannot get video info. One of the reason might be touching the red line even if this is for studying, I guess.`
      ); //I18N TODO
    } else {
      alert(`At this moment, it cannot work.`);
      // I18N TODO
    }
    return;
  }
  const tracks = service.getCaptionTracks(stInfo);
  if (!!tracks === false || tracks.length === 0) {
    alert(`No caption tracks I can find for this video.`); //I18N TODO
    return;
  }
  const result = tracks?.map((v) => {
    return {
      langCode: v.languageCode,
      simpleText: v.name.simpleText,
      baseUrl: v.baseUrl,
    } as IMyCaptionTrack;
  });

  return result;
}
