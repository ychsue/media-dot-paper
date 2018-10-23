import { Injectable } from '@angular/core';
import { Story } from '../vm/story';
import { mediaPlayType, mediaVPType } from '../vm/story-g-setting';
import { AFrame } from '../vm/a-frame';

@Injectable({
  providedIn: 'root'
})
export class SbvService {

  constructor() { }

  getSbvStringFromStory(story: Story, startTime = 0): string {
    const self = this;
    let result = '';
    let hasGotten1stEle = false;

    const getDt = (ind: number, tstart: number, tend: number) => {
          let rate = 1;
          if ((ind === -1)
            || (story.gSetting.mVPType === mediaVPType.main)
            || (story.frames[ind].useDefVP)) {
            rate = story.gSetting.rate;
          } else if (story.gSetting.mVPType === mediaVPType.mdp) {
            rate = story.frames[ind].rate;
          }
          return (tend - tstart) / rate; // delta t corrected with rate
    };

    const getSBVTimeString = (ind: number, sTime: number, dt: number) => {
      let st = '';
      if ((ind >= 0) && (ind < story.frames.length)) {
        const cur = story.frames[ind];
        if (!!cur.utterPara && !!cur.utterPara.text) {
          st = self.getTimeString(sTime)
              + ','
              + self.getTimeString(sTime + dt)
              + '\n'
              + cur.utterPara.text;
        }
      }
      if (!!st && (hasGotten1stEle === false)) {
        hasGotten1stEle = true;
      } else if (!!st) {
        st = '\n\n' + st;
      }
      return st;
    };

    switch (story.gSetting.mPlayType) {
      case mediaPlayType.mdp:
      // #region For mPlayType = mdp
        for (let i0 = 0; i0 < story.frames.length; i0++) {
          const cur = story.frames[i0];
          const dt = getDt(i0, cur.start, cur.end);
          result += getSBVTimeString(i0, startTime, dt);
          startTime += dt;
        }
      // #endregion For mPlayType = mdp
      break;
      case mediaPlayType.timeline:
        // #region For mPlayType = timeline
        // * [2018-10-23 14:08] Get all start and end times of frames
        let times = story.frames.reduce((pre, cur) => {
          pre.push(cur.start, cur.end);
          return pre;
        }, [0]);
        times = times.sort((a, b) => a - b);
        // * [2018-10-23 14:20] Check all segments
        for (let i0 = 0; i0 < (times.length - 1); i0++) {
          const tstart = times[i0];
          const tend = times[i0 + 1];
          if (tstart === tend) {continue; }
          // * [2018-10-23 14:31] Because I just use ~findIndex~ in media-edit.component.ts, I'll just use ~findIndex~ here
          const ind = story.frames.findIndex(frame => ((frame.start <= tstart) && (frame.end >= tend )));
          // * [2018-10-23 14:36] Calculate delta t correctted by rate.
          const dt = getDt(ind, tstart, tend);
          result += getSBVTimeString(ind, startTime, dt);
          startTime += dt;
        }
        // #endregion For mPlayType = timeline
        break;
      default:
        break;
    }

    return result;
  }

  getTimeString(t: number): string {
    let st = '';
    let buf = Math.floor(t);
    // * [2018-08-27 15:29] Get minisecond
    st = ('000' + Math.floor((t - buf) * 1000)).slice(-3);
    st = '.' + st;
    // * [2018-08-27 15:34] Get second
    t = buf;
    buf = t % 60;
    st = ('00' + buf).slice(-2) + st;
    st = ':' + st;
    // * [2018-08-27 15:38] Get minute
    t = (t - buf) / 60;
    buf = t % 60;
    st = ('00' + buf).slice(-2) + st;
    st = ':' + st;
    // * [2018-08-27 15:38] Get hour
    t = (t - buf) / 60;
    buf = t;
    st = buf + st;
    // * [2018-08-27 15:42] Return the string
    return st;
  }
}
