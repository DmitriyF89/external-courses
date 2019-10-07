function findPropInProto(prop, obj) {
  return obj.hasOwnProperty(prop) ? undefined : obj[prop];
}

module.exports = findPropInProto;