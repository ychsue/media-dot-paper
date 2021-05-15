import initAsync from "./initAsync";
import { signInStatus$ } from "./signInStatus$";
import signInAsync from "./signInAsync";
import signOutAsync from "./signOutAsync";
import isSignedIn from "./isSignedIn";
import { userProfile$ } from "./User/userProfile$";
import createFileAsync from "./Drive/createFileAsync";
import createFolderAsync from "./Drive/createFolderAsync";
import getFolderIdRecursivelyAsync from "./Drive/getFolderIdRecursivelyAsync";
import searchItemsAsync from "./Drive/searchItemsAsync";
import downloadItemAsync from "./Drive/downloadItemAsync";
import getInfoFromIdAsync from "./Drive/getInfoFromIdAsync";
import createSSAsync from "./Sheets/createSSAsync";
import getSheetsInfoAsync from "./Sheets/getSheetsInfoAsync";
import getCellsValueAsync from "./Sheets/getCellsValueAsync";
import setCellsValueAsync from "./Sheets/setCellsValueAsync";
import setCellsFormatAsync from "./Sheets/setCellsFormatAsync";
import setSheetPropAsync from "./Sheets/setSheetPropAsync";

import addASheetAsync from "./Sheets/addASheetAsync";
import renameASheetAsync from "./Sheets/renameASheetAsync";
import clearASheetAsync from "./Sheets/clearASheetAsync";

import groupSheetDimAsync from "./Sheets/groupDimAsync";
import batchUpdateSSAsync from "./Sheets/batchUpdateAsync";
import { isLoaded } from "./isLoaded";
import getFileIdFromUri from "./utils/getFileIdFromUri";
import { isAuthLoaded$ } from "./isAuthLoaded$";

export const service = {
  initAsync,

  isLoaded,
  isAuthLoaded$,

  signInStatus$,
  signInAsync,
  signOutAsync,
  isSignedIn,

  userProfile$,

  createFileAsync,
  createFolderAsync,
  searchItemsAsync,
  downloadItemAsync,
  getInfoFromIdAsync,
  getFolderIdRecursivelyAsync,

  batchUpdateSSAsync,

  createSSAsync,
  getSheetsInfoAsync,
  getCellsValueAsync,
  setCellsValueAsync,
  setCellsFormatAsync,
  setSheetPropAsync,
  groupSheetDimAsync,
  addASheetAsync,
  renameASheetAsync,
  clearASheetAsync,

  getFileIdFromUri,

  getAuthInstance: () => gapi.auth2.getAuthInstance(),
};
