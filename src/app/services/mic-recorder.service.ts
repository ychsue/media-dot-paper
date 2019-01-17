import { Injectable, NgZone } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MessageService } from './message.service';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { DeviceService } from './device.service';

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

  hasMediaRecorder: boolean;
  mrecorder: any;

  hasGetUserMedia: boolean;
  stream: MediaStream;
  buffers: Int16Array[] = [];
  buffer: ArrayBuffer;
  blob: Blob;
  url = "";

  private _isRecording = false;
  public get isRecording(): boolean {
    return this._isRecording;
  }
  public set isRecording(v: boolean) {
    const self = this;
    self._isRecording = v;
    if (v) {
      self._startTime = Date.now();
      self.recordTimeMs = 0;
      interval(200).pipe(takeWhile(_ => (self._isRecording)))
      .subscribe(_ => {
        if (self.recordTimeMs < self.maxSec * 1000) {
          self.recordTimeMs = Date.now() - self._startTime;
        } else {
          self.stop();
        }
      });
    }
  }

  maxSec = 60;

  isMakingWav = false;

  private _startTime: number;

  recordTimeMs = 0;

  context: AudioContext;

  win_MediaCapture: Windows.Media.Capture.MediaCapture;
  win_Profile: Windows.Media.MediaProperties.MediaEncodingProfile;
  win_file: Windows.Storage.StorageFile;

  constructor(public msg: MessageService, private ngZone: NgZone, private device: DeviceService) {
    this.hasGetUserMedia = (!!navigator.mediaDevices && !!navigator.mediaDevices.getUserMedia);
    this.hasMediaRecorder = !!window['MediaRecorder'];
    const audioContext = window['AudioContext'] || window['webkitAudioContext'];
    if (!!audioContext) {
      this.context = new audioContext();
    }
  }

  async record() {
    const self = this;
    // * [2019-01-16 21:18] For windows UWP
    if (self.device.isCordova && cordova.platformId === 'windows') {
      if (!!!self.win_MediaCapture) {
        self.win_MediaCapture = new Windows.Media.Capture.MediaCapture();
        const initSettings = new Windows.Media.Capture.MediaCaptureInitializationSettings();
        initSettings.streamingCaptureMode = Windows.Media.Capture.StreamingCaptureMode.audio;
        await self.win_MediaCapture.initializeAsync(initSettings);
        // tslint:disable-next-line:max-line-length
        self.win_Profile = Windows.Media.MediaProperties.MediaEncodingProfile.createM4a(Windows.Media.MediaProperties.AudioEncodingQuality.auto);
      }
      // tslint:disable-next-line:max-line-length
      self.win_file = await Windows.Storage.ApplicationData.current.temporaryFolder.createFileAsync("mediaDotPaper_record.m4a", Windows.Storage.CreationCollisionOption.replaceExisting);
      self.win_MediaCapture.startRecordToStorageFileAsync(self.win_Profile, self.win_file);
      self.isRecording = true;
      return;
    } else if (!!this.hasGetUserMedia) {
      try {
        self.stream = await navigator.mediaDevices.getUserMedia({audio: <any>{
          echoCancellation: true,
          noiseSuppression: true
        },
          video: false
        });

        self.isRecording = true;
        let isDisConnect = false;

        if (self.hasMediaRecorder) {
          // * [2019-01-14 21:51] create a new recorder
          self.mrecorder = new window['MediaRecorder'](self.stream);
          self.mrecorder.start(100);
          self.mrecorder.ondataavailable = (e => {
            self.buffers.push(e.data);
          });
          self.mrecorder.onstop = e => {
            self.blob = new Blob(self.buffers, { type : 'audio/m4a' });
            self.url = URL.createObjectURL(self.blob);
            self.clearMe();
          };
        } else if (!!self.context) {
          const input = self.context.createMediaStreamSource(self.stream);
          const gain = self.context.createGain();
          const processor = gain.context.createScriptProcessor(self.config.bufferLen, 2, 2);
          processor.onaudioprocess = e => {
            if (!!!self.isRecording) {
              if (isDisConnect) {return; }
              input.disconnect(gain);
              gain.disconnect(processor);
              processor.disconnect(self.context.destination);
              isDisConnect = true;
            }
            const data0 = e.inputBuffer.getChannelData(0);
            const data1 = e.inputBuffer.getChannelData(1);
            self.buffers.push(self._f32ToI16(data0));
            self.buffers.push(self._f32ToI16(data1));
          };
          input.connect(gain);
          gain.connect(processor);
          processor.connect(self.context.destination);
        } else {
          self.msg.alert('目前本版本尚無法在此平台錄音，抱歉。');
        }
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

  async stop() {
    const self = this;
    if (!!!self.isRecording) { return; }
    self.isRecording = false;

    if (!!self.url) {
      URL.revokeObjectURL(self.url);
      self.blob = null;
      self.url = null;
    }

    // * [2019-01-16 21:18] For windows UWP
    if (self.device.isCordova && cordova.platformId === 'windows') {
      await self.win_MediaCapture.stopRecordAsync();
      self.url = URL.createObjectURL(self.win_file);
    } else if (self.hasMediaRecorder) {
      self.mrecorder.stop();
    } else if (!!self.context) {
      // * [2019-01-10 15:32] Get the data as wav format
      self.exportWav();
      self.clearMe();
    }

  }

  clearMe() {
    const self = this;
      // * [2019-01-09 14:51] Clarify

      const tracks = self.stream.getAudioTracks();
      tracks.forEach(t => {
        t.stop();
      });
      // self.stream.stop(); // it does not have method "stop"
      self.stream = null;
      // self.tracks = null;
      self.buffers = [];
      self.mrecorder = null;
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
