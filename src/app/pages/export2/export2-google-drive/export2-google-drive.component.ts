import { Component, OnInit } from "@angular/core";
import { GapiService } from "src/app/services/GAPI/gapi.service";
import { GvService } from "src/app/services/gv.service";
import { MediaEditService } from "src/app/services/media-edit.service";
import { MessageService } from "src/app/services/message.service";
import { StoryService } from "src/app/services/story.service";
import { ZipService } from "src/app/services/ZIP/zip.service";

@Component({
  selector: "app-export2-google-drive",
  templateUrl: "./export2-google-drive.component.html",
  styleUrls: ["./export2-google-drive.component.css"],
})
export class Export2GoogleDriveComponent implements OnInit {
  constructor(
    public GAPIService: GapiService,
    public ZIPService: ZipService,
    public meService: MediaEditService,
    public msg: MessageService,
    public gv: GvService
  ) {}

  ngOnInit(): void {}

  async onSaveAsync(fType: "MDPYC" | "ZIP" | "SHEETS") {
    const story = this.meService.story;

    this.gv.appComp.startProgress(`創造 ${fType}檔案中`, "請稍候");
    try {
      const result = await this.GAPIService.save2DriveAsync(story, fType);
      this.msg.alert(
        `檔案 $0 已經成功輸出到 Google Drive 上了！`.replace("$0", result.path)
      );
    } catch (error) {
      this.msg.alert(`抱歉，出現問題： $0`.replace("$0", error.message));
    }

    this.gv.appComp.stopProgress();
  }
}
