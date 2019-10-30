function transformArr(arr, func) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    result.push(func(arr[i], i, arr))
  }
  return result;
}

module.exports = transformArr;