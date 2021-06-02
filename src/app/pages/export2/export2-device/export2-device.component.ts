import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatAnchor } from "@angular/material/button";
import { FsService } from "src/app/services/fs.service";
import { MediaEditService } from "src/app/services/media-edit.service";
import { MessageService } from "src/app/services/message.service";
import { StoryService } from "src/app/services/story.service";
import { PlayerType } from "src/app/vm/player-type.enum";
import { StringHelper } from "src/app/extends/string-helper";

@Component({
  selector: "app-export2-device",
  templateUrl: "./export2-device.component.html",
  styleUrls: ["./export2-device.component.css"],
})
export class Export2DeviceComponent implements OnInit, OnDestroy {
  pts: any;
  downloadHref: string;

  filename: string;

  constructor(
    public meService: MediaEditService,
    public msg: MessageService,
    private storyService: StoryService,
    private fs: FsService
  ) { }

  ngOnDestroy(): void {
    if (!!this.downloadHref) {
      URL.revokeObjectURL(this.downloadHref);
    }
  }

  ngOnInit(): void { }

  onExportStory(sender: MatAnchor, e: MouseEvent) {
    const self = this;
    const a = sender._elementRef.nativeElement as HTMLAnchorElement;
    if (self.meService.story.meType === PlayerType.file) {
      e.preventDefault();
      self.msg.alert(
        !!self.pts
          ? self.pts.notYetFileExport
          : "抱歉，由於想匯出的媒體為local的檔案，這表示此檔案也要一同匯出才行。此版本尚未將此功能建構進來，敬請諒解。"
      );
      return;
    }

    self.filename = StringHelper.toFileName(self.meService.story.name);

    // * [2018-09-04 12:06] Start to store into the file
    if (!!window.cordova === true || !!window?.Windows) {
      e.preventDefault();
      self.fs.saveTxtFile$$(
        self.storyService.stringifyAStory(self.meService.story),
        Math.round(self.meService.story.viewTime / 1000) +
          // + self.meService.story.name.replace(/\/|\:/g, '_') + '.json');
          self.filename +
          ".mdpyc"
      );
    } else {
      let blob: Blob;
      // blob = new Blob([JSON.stringify(self.meService.story)], {type: 'application/json'});
      // if (!!window.cordova && cordova.platformId === 'android') {
      blob = new Blob(
        [self.storyService.stringifyAStory(self.meService.story)],
        <any>{ encoding: "UTF-8", type: "text/plain;charset=UTF-8" }
      );
      // }
      this.downloadHref = URL.createObjectURL(blob);
      // this.downloadHref = "data:text/json;charset=utf-8," + encodeURI(JSON.stringify(this.meService.story));
    }
  }
}
