function filterArr(arr, func) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    if (func(arr[i], i, arr)) {
      result.push(arr[i]);
    }
  }
  return result;
}

module.exports = filterArr;