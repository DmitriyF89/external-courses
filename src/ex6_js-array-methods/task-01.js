function copyPartOfArr(arr, begin = 0, end = arr.length) {
  const
    result = [],
    realEnd = end >= 0 ? end : arr.length + end,
    realBegin = begin >= 0 ? begin : arr.length + begin;

  for (let i = realBegin; i < realEnd; i++) {
    result.push(arr[i]);
  }
  return result;
};

module.exports = copyPartOfArr;