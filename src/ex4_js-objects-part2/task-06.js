function capitalizeAllFirstLetters(str) {
  const words = str.split(' ');

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].slice(1);
  }
  return (str = words.join(' ')); //eslint-disable-line no-param-reassign
}

module.exports = capitalizeAllFirstLetters;