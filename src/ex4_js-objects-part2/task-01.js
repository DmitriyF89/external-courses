function findPropInProto(prop, obj) {
  return obj.__proto__[prop];
}

module.exports = findPropInProto;