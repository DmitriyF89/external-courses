function toLowerCamelCase(str) {
  const words = str.toLowerCase().split(' ');

  for (let i = 1; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].slice(1);
  }
  return (str = words.join('')); //eslint-disable-line no-param-reassign
}

module.exports = toLowerCamelCase;