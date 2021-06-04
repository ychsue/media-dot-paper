import { PlayerComponent } from "./player.component";

export default function _toggleAudioVideo(type: string, url: string) {
  const self = this as PlayerComponent;

  if (/audio/i.test(type)) {
    self.mediaEle = self.audioEle;
    self.videoEle.pause();
    self.displayWho = "audio";
  } else {
    self.mediaEle = self.videoEle;
    self.audioEle.pause();
    self.displayWho = "video";
  }
  self.videoSrc = url;
  self.videoEle.load();
  self.audioEle.load();
}
