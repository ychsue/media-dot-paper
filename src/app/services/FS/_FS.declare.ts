export interface IWinOpenFilePickerPara {
  fileTypeFilter?: string[];
  justCacheMedia?: boolean;
}

export interface IW3CFileWithMetadata extends File {
  WinMetaData?: IWinCacheMetaData;
}

/**
 * token: token
 * path: file path
 * type: mimeType
 */
export interface IWinCacheMetaData {
  token: string;
  path: string;
  type: string;
}
