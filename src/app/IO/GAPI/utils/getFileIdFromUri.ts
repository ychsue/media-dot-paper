export default function getFileIdFromUri(uri: string) {
  const regExp = /^https:\/\/.*google.com.*(?:id=|\/d\/)([^\&\/]+)/i;
  var id = "";
  if (regExp.test(uri)) {
    const buf = uri.match(regExp);
    if (buf.length === 2) id = buf[1];
  }

  return id;
}
