import { Component, OnInit } from "@angular/core";
import { GapiService } from "src/app/services/GAPI/gapi.service";
import { GvService } from "src/app/services/gv.service";
import { MediaEditService } from "src/app/services/media-edit.service";
import { MessageService } from "src/app/services/message.service";
import { StoryService } from "src/app/services/story.service";
import { ZipService } from "src/app/services/ZIP/zip.service";
import { AFrame } from "src/app/vm/a-frame";

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
    public gv: GvService,
    private storyService: StoryService
  ) {}

  ngOnInit(): void {}

  async onSaveAsMDPYCAsync() {
    const name = this.meService.story.name + ".mdpyc";
    const blob = new Blob([
      this.storyService.stringifyAStory(this.meService.story),
    ]);

    this.gv.appComp.startProgress(
      "創造檔案 $0 中".replace("$0", name),
      "請稍候"
    );

    try {
      await this.GAPIService.service.createFileAsync({ name, blob });
      this.msg.alert(
        `檔案 $0 已經成功輸出到 Google Drive 上了！`.replace("$0", name)
      );
    } catch (error) {
      this.msg.alert(`抱歉，出現問題： $0`.replace("$0", error.message));
    }

    this.gv.appComp.stopProgress();
  }

  async onSaveAsZipAsync() {
    const path = this.meService.story.name + ".mdpyczip";
    const data = JSON.stringify(this.meService.story);

    this.gv.appComp.startProgress(
      "創造檔案 $0 中".replace("$0", path),
      "請稍候"
    );

    try {
      const blob = await this.ZIPService.service.export2ZipAsync([
        { path: "01.mdpyc", data },
      ]);
      await this.GAPIService.service.createFileAsync({ name: path, blob });
      this.msg.alert(
        `檔案 $0 已經成功輸出到 Google Drive 上了！`.replace("$0", path)
      );
    } catch (error) {
      this.msg.alert(`抱歉，出現問題： $0`.replace("$0", error.message));
    }

    this.gv.appComp.stopProgress();
  }

  async onSaveAsSheetAsync() {
    const story = this.meService.story;
    const path = story.name + ".mdpycsheet";
    const data: Array<Array<number | string | null>> = [];

    this.gv.appComp.startProgress(
      "創造檔案 $0 中".replace("$0", path),
      "請稍候"
    );

    const frameKeys = [...Object.keys(new AFrame())];

    for (let i0 = 0; i0 < 4; i0++) {
      data.push([]);
    }
    data.push([null, null, null, null, "mdpyc", ...frameKeys]);

    for (let i0 = 0; i0 < story.frames.length; i0++) {
      const e0 = story.frames[i0];
      const frameRow = [null, null, null, null, i0];
      for (let i1 = 0; i1 < frameKeys.length; i1++) {
        const e1 = frameKeys[i1];
        const value =
          typeof e0[e1] === "object" ? JSON.stringify(e0[e1]) : e0[e1];
        frameRow.push(value);
      }
      data.push(frameRow);
    }

    try {
      // * [2021-04-07 11:01] Create a spreadsheet and get its id
      var res = await this.GAPIService.service.createSSAsync({ title: path });
      const spreadsheetId = res.result.spreadsheetId;
      const sheetName = res.result.sheets[0].properties.title;
      const sheetId = res.result.sheets[0].properties.sheetId;

      // * [2021-04-07 11:02] Save data into this spreadsheet
      res = await this.GAPIService.service.setCellsValueAsync({
        range: sheetName,
        spreadsheetId,
        resource: {
          values: data,
        },
      });

      const buf = { ...story };
      delete buf.frames;
      res = await this.GAPIService.service.setCellsValueAsync({
        range: sheetName + `!B2`,
        spreadsheetId,
        resource: {
          values: [[JSON.stringify(buf)]],
        },
      });

      // * [2021-04-07 15:22] Folding
      res = await this.GAPIService.service.groupSheetDimAsync({
        spreadsheetId,
        sheetId,
        startIndex: 0,
        endIndex: 4,
        dimension: "COLUMNS",
      });

      res = await this.GAPIService.service.groupSheetDimAsync({
        spreadsheetId,
        sheetId,
        startIndex: 0,
        endIndex: 4,
        dimension: "ROWS",
      });

      this.msg.alert(
        `檔案 $0 已經成功輸出到 Google Drive 上了！`.replace("$0", path)
      );
    } catch (error) {
      this.msg.alert(`抱歉，出現問題： $0`.replace("$0", error.message));
    }

    this.gv.appComp.stopProgress();
  }
}
