export interface ICaptionTrack {
  languageCode: string;
  baseUrl: string;
  name: { simpleText: string };
}

export interface ICaptionDataItem {
  dur: number;
  start: number;
  subtitle: string;
}
