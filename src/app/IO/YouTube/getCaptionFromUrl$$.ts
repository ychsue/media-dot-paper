import { ICaptionDataItem } from "./typeDefs";

export default async function getCaptionFromUrl$$(url: string) {
  let result: ICaptionDataItem[] = [];

  if (!!url === false || !!window?.Windows === false) return result;

  const httpClient = new window.Windows.Web.Http.HttpClient();
  const uri = new Windows.Foundation.Uri(url);

  let res = "";
  try {
    // 1. Get response
    res = await httpClient.getStringAsync(uri);
    // 2. Turn it into an object
    result = parseXML(res);
  } catch (error) {
    console.log(`getCaptionFromUrl$$ error`);
    console.error(error);
  }

  return result;
}

function parseXML(sXml: string) {
  const parser = new DOMParser();
  const dom = parser.parseFromString(sXml, "application/xml");
  return document2ObjArray(dom); // ************************ TODO *******************************
}

function document2ObjArray(dom: Document) {
  let result = [];
  if (dom.documentElement.nodeName === "parsererror") return;
  const doc = dom.documentElement;
  // 1. Get attribute Names
  const children = doc.children;
  if (children.length === 0) return;
  const attNames = children[0].getAttributeNames();
  console.log(`The attribute names I get is${JSON.stringify(attNames)}`);
  // 2. doc to objArray
  for (let i0 = 0; i0 < children.length; i0++) {
    const child = children[i0];
    let data = attNames.reduce((p, c) => {
      p[c] = child.getAttribute(c);
      return p;
    }, {});
    data["subtitle"] = child.innerHTML;
    result.push(data);
  }

  return result;
}
