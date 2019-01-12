import { Injectable } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class MicRecorderService {

  // * Based on the concept of https://github.com/mattdiamond/Recorderjs/blob/master/src/recorder.js
  config = {
    bufferLen: 4096,
    mimeType: 'audio/wav',
    nc: 2
  };

  hasGetUserMedia: boolean;
  stream: MediaStream;
  buffers: Int16Array[] = [];
  buffer: ArrayBuffer;
  blob: Blob;
  url = "";

  isRecording = false;
  isMakingWav = false;

  context: AudioContext;

  constructor(public msg: MessageService) {
    this.hasGetUserMedia = (!!navigator.mediaDevices && !!navigator.mediaDevices.getUserMedia);
    const audioContext = window['AudioContext'] || window['webkitAudioContext'];
    if (!!audioContext) {
      this.context = new audioContext();
    }
  }

  async record() {
    const self = this;
    if (!!this.hasGetUserMedia) {
      try {
        self.stream = await navigator.mediaDevices.getUserMedia({audio: <any>{
          echoCancellation: true,
          noiseSuppression: true
        },
          video: false
        });
        // self.tracks = self.stream.getAudioTracks();
        const input = self.context.createMediaStreamSource(self.stream);
        const gain = self.context.createGain();
        const processor = gain.context.createScriptProcessor(self.config.bufferLen, 2, 2);
        self.isRecording = true;
        let isDisConnect = false;
        processor.onaudioprocess = e => {
          if (!!!self.isRecording) {
            if (isDisConnect) {return; }
            input.disconnect(gain);
            gain.disconnect(processor);
            processor.disconnect(self.context.destination);
            isDisConnect = true;
          }
          const data = e.inputBuffer.getChannelData(0);
          self.buffers.push(self._f32ToI16(e.inputBuffer.getChannelData(0)));
          self.buffers.push(self._f32ToI16(e.inputBuffer.getChannelData(1)));
        };
        input.connect(gain);
        gain.connect(processor);
        processor.connect(self.context.destination);

      } catch (error) {
        self.msg.alert(`error: ${error}`);
        console.log(error);
      }
    } else {
      // ************************ TODO ******************************
      self.msg.alert("因為缺了 getUserMedia 方法，無法錄音。");
    }
  }

  private _f32ToI16(f32: Float32Array) {
    const result = new Int16Array(f32.length);
    for (let i0 = 0; i0 < f32.length; i0++) {
      const ele = f32[i0];
      const pulse = Math.max(-1, Math.min(1, ele));
      const iPulse = Math.round((pulse < 0) ? (pulse * 0x8000) : (pulse * 0x7FFF));
      result[i0] = iPulse;
    }
    return result;
  }

  stop() {
    const self = this;
    self.isRecording = false;

    if (!!self.blob) {
      URL.revokeObjectURL(self.url);
      self.blob = null;
      self.url = null;
    }

    if (self.buffers.length > 0) {
      // * [2019-01-10 15:32] Get the data as wav format
      self.exportWav();

      // * [2019-01-09 14:51] Clarify

      const tracks = self.stream.getAudioTracks();
      tracks.forEach(t => {
        t.stop();
      });
      // self.stream.stop(); // it does not have method "stop"
      self.stream = null;
      // self.tracks = null;
      self.buffers = [];
    }
  }

  exportWav() {
    const self = this;
    const nc = self.config.nc; // number of channel
    const ns = self.buffers.length * self.config.bufferLen / nc;
    const F = self.context.sampleRate;
    const M = 2; // 16 bit

    self.buffer = new ArrayBuffer(44 + M * ns * nc); // Create an empty buffer
    const view = new DataView(self.buffer);

    // * [2019-01-10 15:44] Initialize wav's head http://www-mmsp.ece.mcgill.ca/Documents/AudioFormats/WAVE/WAVE.html
    // ** [2019-01-10 15:53] RIFF region
    self._writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + M * ns * nc, true);
    self._writeString(view, 8, 'WAVE');
    // ** [2019-01-10 15:55] Chunk region
    self._writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, nc, true);
    view.setUint32(24, F, true);
    view.setUint32(28, F * M * nc, true);
    view.setUint16(32, M * nc, true);
    view.setUint16(34, 8 * M, true);
    // ** [2019-01-10 16:10] Data region
    self._writeString(view, 36, 'data');
    view.setUint32(40, M * nc * ns, true);

    // * [2019-01-10 16:15] Append Data
    self.isMakingWav = true;
    let offset = 44;
    for (let i0 = 0; i0 < self.buffers.length; i0 += self.config.nc) {
      const sLen = self.buffers[i0].length;
      for (let i1 = 0; i1 < sLen; i1++) {
        for (let ic = 0; ic < self.config.nc; ic++) {
          const value = self.buffers[i0 + ic][i1];
          view.setInt16(offset, value, true);
          offset += M;
        }
      }
  }

    // * [2019-01-10 16:27] Get its view and url
    self.blob = new Blob([view], {type: self.config.mimeType});
    self.url = URL.createObjectURL(self.blob);

    self.isMakingWav = false;
  }

  private _writeString(view: DataView, offset: number, st: String) {
    for (let i0 = 0; i0 < st.length; i0++) {
      const ch = st.charCodeAt(i0);
      view.setUint8(offset + i0 , ch);
    }
  }
}
