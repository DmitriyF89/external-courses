function reductionString(str, num) {
  let result = '';

  if (str.length > num) {
    for (let i = 0; i < num - 1; i++) {
      result += str[i];
    }
    result += `\u2026`;
  } else {
    result = str;
  }
  return result;
}

module.exports = reductionString;