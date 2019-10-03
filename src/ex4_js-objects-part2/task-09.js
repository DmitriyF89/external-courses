function addWordToString(destStr, addStr, pos) {
  const words = destStr.split(' ');
  const firstPart = [];
  const lastPart = [];

  for (let i = 0; i <= pos; i++) {
    firstPart.push(words[i]);
  }

  for (let i = pos + 1; i < words.length; i++) {
    lastPart.push(words[i]);
  }
  return (str = [...firstPart, addStr, ...lastPart].join(' '));
}

module.exports = addWordToString;