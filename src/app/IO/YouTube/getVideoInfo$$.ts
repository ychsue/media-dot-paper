/**
 *
 * @param vId The video's Id
 * @returns a response of promiselike<string>
 */
export default async function getVideoInfo$$(vId: string) {
  let result: string | undefined;
  if (!!vId === false) return result;
  if (!!window?.Windows) {
    try {
      const httpClient = new window.Windows.Web.Http.HttpClient();
      const uri = new window.Windows.Foundation.Uri(
        `https://www.youtube.com/get_video_info?html5=1&video_id=${vId}`
      );

      const res = await httpClient.getAsync(uri);
      result = await getString$$(res);
    } catch (error) {
      console.log("getVideoInfo$$ error");
      console.log(error);
    }
  }

  return result;
}

async function getString$$(res: any) {
  res.ensureSuccessStatusCode();
  return await res.content.readAsStringAsync();
}
