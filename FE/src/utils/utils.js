export function decodeData(encodedHtmlArr, selected) {
  if (encodedHtmlArr && encodedHtmlArr.length > selected) {
    return decodeURIComponent(encodedHtmlArr?.[selected]);
  }
  return "nothing to see here";
}
