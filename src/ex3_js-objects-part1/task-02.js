function printObject (obj) {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      console.log(prop, obj[prop]);
    }
  }
}

module.exports = printObject;