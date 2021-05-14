import { Component, OnDestroy, OnInit } from "@angular/core";
import { merge, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { GapiService } from "src/app/services/GAPI/gapi.service";
import { GvService } from "src/app/services/GV/gv.service";
import { MediaEditService } from "src/app/services/media-edit.service";
import { MessageService } from "src/app/services/message.service";
import { PageTextsService } from "src/app/services/page-texts.service";
import { StoryService } from "src/app/services/story.service";
import { ZipService } from "src/app/services/ZIP/zip.service";

@Component({
  selector: "app-export2-google-drive",
  templateUrl: "./export2-google-drive.component.html",
  styleUrls: ["./export2-google-drive.component.css"],
})
export class Export2GoogleDriveComponent implements OnInit, OnDestroy {

  unSubscribed = new Subject<boolean>();  

  pts: IEx2GDComp=null;
  constructor(
    public GAPIService: GapiService,
    public ZIPService: ZipService,
    public meService: MediaEditService,
    public msg: MessageService,
    public gv: GvService,
    private ptsService: PageTextsService
  ) {
    const self = this;
    merge(self.ptsService.PTSReady$,self.ptsService.ptsLoaded$)
      .pipe(takeUntil(self.unSubscribed)).subscribe(_=>{
        self.pts = self.ptsService.pts.ex2GDComp;
      });
   }

  ngOnDestroy(): void {
    this.unSubscribed.next(true);
    this.unSubscribed.complete();
    this.unSubscribed = null;
  }

  ngOnInit(): void { }

  async onSaveAsync(fType: "MDPYC" | "ZIP" | "SHEETS") {
    const story = this.meService.story;
    const self = this;

    this.gv.appComp.startProgress(
      (!!self.pts ? self.pts.createFileTitle : `創造 {0} 檔案中`).replace(
        `{0}`,
        fType
      ),
      !!self.pts ? self.pts.createFileContent : "請稍候"
    );
    try {
      const result = await this.GAPIService.save2DriveAsync(story, fType,
        this.gv.export2FolderId);
      this.msg.alert(
        (!!self.pts
          ? self.pts.createFileSuccess
          : `檔案 {0} 已經成功輸出到 Google Drive 上了！`
        ).replace("{0}", result.path)
      );
    } catch (error) {
      this.msg.alert(
        (!!self.pts
          ? self.pts.createFileFail
          : `抱歉，出現問題： {0}`
        ).replace("{0}", error.error)
      );
    }

    this.gv.appComp.stopProgress();
  }
}
