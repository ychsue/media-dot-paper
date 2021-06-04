import {
  IW3CFileWithMetadata,
  IWinCacheMetaData,
} from "src/app/services/FS/_FS.declare";
import { PlayerComponent } from "./player.component";
import _toggleAudioVideo from "./_toggleAudioVideo";

export default async function _loadMediaFromWinFile$$(params: {
  metadata: IWinCacheMetaData;
}) {
  const self = this as PlayerComponent;

  let { metadata } = { ...params };
  let isAValideToken = false;
  let file: IW3CFileWithMetadata;

  // 1. Does metadata.token exist and is valid?
  if (!!metadata?.token) {
    file = await self.fsService.getW3CFileFromWinCache$$(metadata.token);
    isAValideToken = !!file;
  }

  // 2. If does not exist, ask people to take a file from openfilepicker
  if (isAValideToken === false) {
    await self.msgService.alert$$(
      `Cannot load the file <b>${metadata?.path}</b>. Please choose one it.`
    );
    file = await self.fsService.pickW3CFileFromWinOpenFilePicker$$({
      justCacheMedia: true,
    });
    // 2.1 If the user choose a file, update this file
    if (!!file) {
      self.meService.story.urlOrID = JSON.stringify(file.WinMetaData);
      metadata = file.WinMetaData;
      isAValideToken = true;
    }
  }

  // 3. For a valid file, setup the play for it
  if (isAValideToken) {
    const url = URL.createObjectURL(file);
    self.toggleAudioVideo(metadata.type, url);
  }
}
