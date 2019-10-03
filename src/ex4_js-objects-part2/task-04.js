function capitalizeFirstLetter(str) {
  str = str[0].toUpperCase() + str.slice(1); //eslint-disable-line no-param-reassign
  return str;
}

module.exports = capitalizeFirstLetter;