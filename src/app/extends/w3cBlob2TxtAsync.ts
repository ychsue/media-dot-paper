/**
 * For WinRT, it does not support Blob.text at 2021/05/31.
 * So I have to use FileReader to read the file.
 * @param blob The Blob of a file
 * @returns String
 */
export default async function w3cBlob2TxtAsync(blob: Blob) {
  if (!!blob?.text) {
    return await blob.text();
  }

  const reader = new FileReader();

  const unHook = () => {
    reader.onerror = undefined;
    reader.onloadend = undefined;
  };

  return new Promise((res: (_: string) => void, rej) => {
    reader.onloadend = (e) => {
      try {
        let txt = e.target.result as string;
        res(txt);
      } catch (error) {
        rej(error);
      }
      unHook();
    };
    reader.onerror = (e) => {
      rej(e);
      unHook();
    };
    reader.readAsText(blob);
  });
}
