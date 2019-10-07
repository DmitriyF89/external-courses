function findPropInProto(prop, obj) {
  if (!obj.hasOwnProperty(prop)) {
    return obj[prop];
  }
  return undefined;
}

module.exports = findPropInProto;