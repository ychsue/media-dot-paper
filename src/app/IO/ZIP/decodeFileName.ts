import * as iconv from "iconv-lite";

export const decodeFileNameFunction = (code='Big5')=>(bytes: Buffer) => {
    return iconv.decode(bytes, code);
}