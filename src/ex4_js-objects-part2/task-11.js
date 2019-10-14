function calcSymEntries(str) {
  const symbols = [];

  for (let i = 0; i < str.length; i++) {
    if (!symbols.includes(str[i]) && str[i] !== ' ') {
      symbols.push(str[i]);
      console.log(str[i]);
    }
  }
}

module.exports = calcSymEntries;