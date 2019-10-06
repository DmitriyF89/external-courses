function checkAndAddPropInObj (str, obj) {
  const newProp = str, newObj = obj;
  if (!(str in obj)) {
    newObj[newProp] = 'new';
  }
  return newObj;
}

module.exports = checkAndAddPropInObj;