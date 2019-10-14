function findSubStr(str, subStr) {
  let resOfSearch = str.indexOf(subStr);

  if (resOfSearch === -1) {
    return false;
  }
  return true;
}

module.exports = findSubStr;