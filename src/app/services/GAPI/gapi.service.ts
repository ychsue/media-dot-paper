import { Injectable } from "@angular/core";
import { StringHelper } from "src/app/extends/string-helper";
import { AFrame } from "src/app/vm/a-frame";
import { IStory } from "src/app/vm/story";
import { service } from "../../IO/GAPI";
import { MediaEditService } from "../media-edit.service";
import { MessageService } from "../message.service";
import { SSutterParameters } from "../speech-synthesis.service";
import { StoryService } from "../story.service";
import { WithClickService } from "../WithClick/with-click.service";
import { ZipService } from "../ZIP/zip.service";

@Injectable({
  providedIn: "root",
})
export class GapiService {
  public service: typeof service;

  constructor(
    private zipService: ZipService,
    private storyService: StoryService,
    private msg: MessageService,
    private withClickService: WithClickService
  ) {
    this.service = service;
  }

  public async getDataFromFileIdAsync(fileId: string) {
    var result: IStory;
    const self = this;

    if (!!!fileId) return result;
    try {
      var res = await service.getInfoFromIdAsync({
        fileId,
        fields: "mimeType",
        signInWithClick: self.withClickService.withClick.bind(self.withClickService)({
          title: "Google Drive 權限",
          content: "您需要登入 GOOGLE此動作才能繼續",
          stYes: "好",
          stNo: "不想"
        }),
        grantWithClick: self.withClickService.withClick.bind(self.withClickService)({
          title: "Google Drive 權限",
          content: "您需要提供 GOOGLE 額外的權限",
          stYes: "好",
          stNo: "不想"
        })
      });
      const mimeType = res.result.mimeType;
      if (
        mimeType.toLowerCase().indexOf(`text`) >= 0 ||
        mimeType === "application/octet-stream"
      ) {
        res = await service.downloadItemAsync({
          fileId,
          signInWithClick: self.withClickService.withClick.bind(self.withClickService)({
            title: "Google Drive 權限",
            content: "您需要登入 GOOGLE此動作才能繼續",
            stYes: "好",
            stNo: "不想"
          }),
          grantWithClick: self.withClickService.withClick.bind(self.withClickService)({
            title: "Google Drive 權限",
            content: "您需要提供 GOOGLE 額外的權限",
            stYes: "好",
            stNo: "不想"
          })
        });
        var data = res.body;
        result = this.storyService.getAStoryFromString(data);
      } else if (mimeType.indexOf("spreadsheet") >= 0) {
        const resSS = await service.getSheetsInfoAsync({
          spreadsheetId: fileId,
        });
        /******************** TODO ********************/
        const sheetName = resSS.result.sheets[0].properties.title;
        const resCells = await service.getCellsValueAsync({
          spreadsheetId: fileId,
          range: sheetName,
        });
        const values = resCells.result.values;

        result = getAStoryFromArray(values);
      } else if (mimeType.indexOf("zip") >= 0) {
        res = await service.downloadItemAsync({ fileId });
        const zip = await this.zipService.service.importFromZipAsync({
          data: res.body,
        });
        /*************** TODO  *************************/
        var data = await zip[0].blob.text();
        result = this.storyService.getAStoryFromString(data);
      } else {
        throw new Error(`Unhandled mimeType: ${mimeType}`);
      }
    } catch (error) {
      this.msg.alert(`無法讀取Google Drive 檔: ${error.message}`);
    }

    return result;
  }

  public async save2DriveAsync(
    story: IStory,
    fType: "MDPYC" | "ZIP" | "SHEETS"
  ) {
    var blob: Blob;
    var path: string = "";
    const fileName = StringHelper.toFileName(story.name);
    switch (fType) {
      case "MDPYC":
        path = fileName + ".mdpyc";
        blob = new Blob([this.storyService.stringifyAStory(story)]);
        await service.createFileAsync({
          name: path,
          blob,
        });
        break;

      case "ZIP":
        const dataZip = JSON.stringify(story);
        path = fileName + ".mdpyczip";
        blob = await this.zipService.service.export2ZipAsync([
          { path: "01.mdpyc", data: dataZip },
        ]);
        await service.createFileAsync({ name: path, blob });

        break;

      case "SHEETS":
        //#region SaveAsSheetAsync
        path = fileName + ".mdpycsheet";
        const data: Array<Array<number | string | null>> = [];

        const frameKeys = [...Object.keys(new AFrame())];

        data.push(["mdpyc"]);

        for (let i0 = 0; i0 < 3; i0++) {
          data.push([]);
        }

        const buf = { ...story };
        delete buf.frames;
        data.push([null, null, null, null, JSON.stringify(buf), ...frameKeys]);

        for (let i0 = 0; i0 < story.frames.length; i0++) {
          const e0 = story.frames[i0];
          const frameRow: Array<number | string> = [null, null, null, null, i0];
          for (let i1 = 0; i1 < frameKeys.length; i1++) {
            const e1 = frameKeys[i1];
            var value: string = "";
            if (e1 === "utterPara") {
              var buf2 = { ...(e0[e1] as SSutterParameters) };
              delete buf2.voice;
              value = JSON.stringify(buf2);
            } else {
              value =
                typeof e0[e1] === "object" ? JSON.stringify(e0[e1]) : e0[e1];
            }

            frameRow.push(value);
          }
          data.push(frameRow);
        }

        // * [2021-04-07 11:01] Create a spreadsheet and get its id
        var res = await service.createSSAsync({ title: path });
        const spreadsheetId = res.result.spreadsheetId;
        const sheetName = res.result.sheets[0].properties.title;
        const sheetId = res.result.sheets[0].properties.sheetId;

        // * [2021-04-07 11:02] Save data into this spreadsheet
        res = await service.setCellsValueAsync({
          range: sheetName,
          spreadsheetId,
          resource: {
            values: data,
          },
        });

        // * [2021-04-07 15:22] Folding
        res = await service.groupSheetDimAsync({
          spreadsheetId,
          sheetId,
          startIndex: 0,
          endIndex: 4,
          dimension: "COLUMNS",
        });

        res = await service.groupSheetDimAsync({
          spreadsheetId,
          sheetId,
          startIndex: 0,
          endIndex: 4,
          dimension: "ROWS",
        });

        //#endregion SaveAsSheetAsync
        break;

      default:
        break;
    }

    return { path };
  }
}

function getAStoryFromArray(values: any[][]) {
  if (values[0][0] !== "mdpyc") throw new Error("The sheet is not a MDP");

  var result: IStory;

  const iHead = 4;
  const iCStart = 4;
  // * [2021-04-08 21:58] Get its data
  result = JSON.parse(values[iHead][iCStart]);
  result.frames = [];

  const colLength = values[iHead].length;
  // ** [2021-04-09 10:42] Scan them one by one
  for (let iRow = iHead + 1; iRow < values.length; iRow++) {
    const aframeArray = values[iRow];
    const aFrame: AFrame = new AFrame();
    for (let iCol = iCStart + 1; iCol < colLength; iCol++) {
      var ele = aframeArray[iCol];
      if (typeof ele === "string" && ele.trim().indexOf(`{`) === 0) {
        ele = JSON.parse(ele);
      }
      aFrame[values[iHead][iCol]] = ele;
    }
    result.frames.push(aFrame);
  }

  return result;
}
