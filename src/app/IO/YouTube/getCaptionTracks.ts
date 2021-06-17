import { ICaptionTrack } from ".";

export default function getCaptionTracks(st: string) {
  st = decodeURIComponent(st);
  let ind = st.indexOf("captionTracks");
  if (ind < 0) return;

  let iStart = 0;
  let iEnd = 0;
  let nBra = 0;
  do {
    ind++;
    if (st[ind] == `[`) {
      if (iStart === 0) {
        iStart = ind;
      }
      nBra++;
    } else if (st[ind] == `]`) {
      nBra--;
      if (nBra <= 0) {
        iEnd = ind;
      }
    }
  } while (!!!iEnd && ind < st.length);

  const needed = st.slice(iStart, iEnd + 1);

  const jString = JSON.parse(`"${needed.replace(/\"/g, `\\"`)}"`);

  return JSON.parse(jString) as ICaptionTrack[];
}
