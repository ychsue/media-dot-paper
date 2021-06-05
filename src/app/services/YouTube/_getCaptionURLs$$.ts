import { service } from "src/app/IO/YouTube";
import { YoutubeService } from "../youtube.service";

export default async function _getCaptionURLs(vid: string) {
  const self = this as YoutubeService;

  // ******* TODO TODO ****************
  return await service.getVideoInfo$$(vid);
}
