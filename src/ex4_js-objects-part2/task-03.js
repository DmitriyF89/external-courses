function cutWhiteSpaces(str) {
  let result = str;

  if (str[0] === ' ') {
    result = result.slice(1);
  }
  if (str[str.length - 1] === ' ') {
    result = result.slice(0, str.length - 2);
  }
  return result;
};

module.exports = cutWhiteSpaces;