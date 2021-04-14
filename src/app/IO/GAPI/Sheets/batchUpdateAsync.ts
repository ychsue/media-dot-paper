import { IWithMustSignIn, withMustSignIn } from "../withMustSignIn";

interface IProps { // Copied from GAPI BatchUpdate
    /** V1 error format. */
    "$.xgafv"?: string;
    /** OAuth access token. */
    access_token?: string;
    /** Data format for response. */
    alt?: string;
    /** JSONP */
    callback?: string;
    /** Selector specifying which fields to include in a partial response. */
    fields?: string;
    /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
    key?: string;
    /** OAuth 2.0 token for the current user. */
    oauth_token?: string;
    /** Returns response with indentations and line breaks. */
    prettyPrint?: boolean;
    /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
    quotaUser?: string;
    /** The spreadsheet to apply the updates to. */
    spreadsheetId: string;
    /** Upload protocol for media (e.g. "raw", "multipart"). */
    upload_protocol?: string;
    /** Legacy upload protocol for media (e.g. "media", "multipart"). */
    uploadType?: string;
    /** Request body */
    resource: gapi.client.sheets.BatchUpdateSpreadsheetRequest;
}

interface IOProps extends IProps, IWithMustSignIn {
}

export default async function batchUpdateAsync(props: IOProps) {
    var { scopes, signInWithClick, grantWithClick, mustLoadScopes, ...propsIn } = props;
    scopes = (!!scopes) ? scopes : 'https://www.googleapis.com/auth/spreadsheets';
    var res = await withMustSignIn({ scopes, signInWithClick, grantWithClick, mustLoadScopes })(
        batchUpdateGAPIAsync)(propsIn);

    return res;
}

async function batchUpdateGAPIAsync(props: IProps) {
    const res = await gapi.client.sheets.spreadsheets.batchUpdate(props);

    if (res.status !== 200) throw new Error(`batchUpdate error code: ${res.status}, text: ${res.statusText}`);

    return res;
}