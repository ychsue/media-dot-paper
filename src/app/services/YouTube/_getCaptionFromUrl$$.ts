import { service } from "src/app/IO/YouTube";
import { IMyCaption } from "./typeDefs";

export default async function _getCaptionFromUrl$$(url: string) {
  const caption = await service.getCaptionFromUrl$$(url);
  return caption.map((v) => {
    return {
      start: +v.start,
      end: +v.start + +v.dur,
      subtitle: v.subtitle,
    } as IMyCaption;
  });
}
