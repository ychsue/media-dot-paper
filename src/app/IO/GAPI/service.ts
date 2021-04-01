import initAsync from "./initAsync";
import { signInStatus$ } from "./signInStatus$";
import signInAsync from "./signInAsync";
import signOutAsync from "./signOutAsync";
import isSignedIn from "./isSignedIn";
import {userProfile$} from "./User/userProfile$";
import createFileAsync from "./Drive/createFileAsync";
import createFolderAsync from "./Drive/createFolderAsync";
import searchItemsAsync from "./Drive/searchItemsAsync";
import downloadItemAsync from "./Drive/downloadItemAsync";
import getInfoFromIdAsync from "./Drive/getInfoFromIdAsync";
import createSSAsync from "./Sheets/createSSAsync";
import getSheetsInfoAsync from "./Sheets/getSheetsInfoAsync";
import getCellsValueAsync from "./Sheets/getCellsValueAsync";
import setCellsValueAsync from "./Sheets/setCellsValueAsync";
import setCellsFormatAsync from "./Sheets/setCellsFormatAsync";
import setSheetPropAsync from "./Sheets/setSheetPropAsync";
import groupDimAsync from "./Sheets/groupDimAsync";
import batchUpdateAsync from "./Sheets/batchUpdateAsync";
import { isLoaded } from "./isLoaded";

export const service = {
    initAsync,

    isLoaded,

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
    
    batchUpdateAsync,

    createSSAsync,
    getSheetsInfoAsync,
    getCellsValueAsync,
    setCellsValueAsync,
    setCellsFormatAsync,
    setSheetPropAsync,
    groupDimAsync,
};
