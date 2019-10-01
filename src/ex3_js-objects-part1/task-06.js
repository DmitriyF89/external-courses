function cloneObjectDeep (obj) {
  const newObj = {};
    
  for (let prop in obj) {
    if (typeof obj[prop] !== 'object') {
      newObj[prop] = obj[prop]; 
    } else if (obj[prop] instanceof Array) {
      newObj[prop] = [...obj[prop]];
    } else if (obj[prop] instanceof Object) {
      newObj[prop] = cloneObjectDeep(obj[prop]); 
    }
  }
  return newObj;
}

module.exports = cloneObjectDeep;