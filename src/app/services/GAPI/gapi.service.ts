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

  readonly scopesForSettings: string =
    "https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.file";

  constructor(
    private zipService: ZipService,
    private storyService: StoryService,
    private msg: MessageService,
    private withClickService: WithClickService
  ) {
    this.service = service;
  }

  public async getGoogleDriveDataFromFileIdAsync(
    fileId: string,
    resultType: "story" | "blob" | "both" = "both"
  ) {
    let result: IStory | Blob | { mimeType: string };
    const self = this;

    if (!!!fileId) return result;
    try {
      const res = await service.getInfoFromIdAsync({
        fileId,
        fields: "mimeType",
        signInWithClick: self.withClickService.withSignInClick,
        grantWithClick: self.withClickService.withGrantClick,
      });
      const mimeType = res.result.mimeType;
      if (
        resultType !== "blob" &&
        /(mdpyc|text|octet\-stream)/i.test(mimeType)
      ) {
        const blob = await service.downloadItemAsync({
          fileId,
          signInWithClick: self.withClickService.withSignInClick,
          grantWithClick: self.withClickService.withGrantClick,
        });
        var data = await blob.text();
        result = this.storyService.getAStoryFromString(data);
      } else if (
        resultType !== "blob" &&
        mimeType.indexOf("spreadsheet") >= 0
      ) {
        const resSS = await service.getSheetsInfoAsync({
          spreadsheetId: fileId,
          signInWithClick: self.withClickService.withSignInClick,
          grantWithClick: self.withClickService.withGrantClick,
        });
        /******************** TODO ********************/
        const sheetName = resSS.result.sheets[0].properties.title;
        const resCells = await service.getCellsValueAsync({
          spreadsheetId: fileId,
          range: sheetName,
          signInWithClick: self.withClickService.withSignInClick,
          grantWithClick: self.withClickService.withGrantClick,
        });
        const values = resCells.result.values;

        result = getAStoryFromArray(values);
      } else if (resultType !== "blob" && mimeType.indexOf("zip") >= 0) {
        const blob = await service.downloadItemAsync({
          fileId,
          signInWithClick: self.withClickService.withSignInClick,
          grantWithClick: self.withClickService.withGrantClick,
        });
        const zip = await this.zipService.service.importFromZipAsync({
          data: blob,
        });
        /*************** TODO  *************************/
        var data = await zip[0].blob.text();
        result = this.storyService.getAStoryFromString(data);
      } else if (resultType !== "story" && /(video|audio)/i.test(mimeType)) {
        return await service.downloadItemAsync({
          fileId,
          signInWithClick: self.withClickService.withSignInClick,
          grantWithClick: self.withClickService.withGrantClick,
        });
      } else {
        return { mimeType };
        // throw new Error(`Unhandled mimeType: ${mimeType}`);
      }
    } catch (error) {
      this.msg.alert(
        `getGoogleDriveDataFromFieldAsync:: Cannot read the file in your Google Drive: ${error.error}`
      ); //I18N
    }

    return result;
  }

  public async save2DriveAsync(
    story: IStory,
    fType: "MDPYC" | "ZIP" | "SHEETS",
    parents?: string
  ) {
    var blob: Blob;
    var path: string = "";
    const fileName = StringHelper.toFileName(story.name);
    const self = this;
    switch (fType) {
      case "MDPYC":
        path = fileName + ".mdpyc";
        blob = new Blob([this.storyService.stringifyAStory(story)]);
        await service.createFileAsync({
          name: path,
          blob,
          parents: [!!parents ? parents : "root"],
        });
        break;

      case "ZIP":
        const dataZip = JSON.stringify(story);
        path = fileName + ".mdpyczip";
        blob = await this.zipService.service.export2ZipAsync([
          { path: "01.mdpyc", data: dataZip },
        ]);
        await service.createFileAsync({
          name: path,
          blob,
          parents: [!!parents ? parents : "root"],
          signInWithClick: self.withClickService.withSignInClick,
          grantWithClick: self.withClickService.withGrantClick,
        });

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
        var res = await service.createSSAsync({
          title: path,
          parents: !!parents ? parents : "root",
          signInWithClick: self.withClickService.withSignInClick,
          grantWithClick: self.withClickService.withGrantClick,
        });
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
          signInWithClick: self.withClickService.withSignInClick,
          grantWithClick: self.withClickService.withGrantClick,
        });

        // * [2021-04-07 15:22] Folding
        res = await service.groupSheetDimAsync({
          spreadsheetId,
          sheetId,
          startIndex: 0,
          endIndex: 4,
          dimension: "COLUMNS",
          signInWithClick: self.withClickService.withSignInClick,
          grantWithClick: self.withClickService.withGrantClick,
        });

        res = await service.groupSheetDimAsync({
          spreadsheetId,
          sheetId,
          startIndex: 0,
          endIndex: 4,
          dimension: "ROWS",
          signInWithClick: self.withClickService.withSignInClick,
          grantWithClick: self.withClickService.withGrantClick,
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
