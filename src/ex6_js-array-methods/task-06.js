function shrinkArr(arr, func, initValue) {
  const startPoint = initValue ? 0 : 1;
  let prevValue = initValue || arr[0];

  for (let i = startPoint; i < arr.length; i++) {
    prevValue = func(prevValue, arr[i], i, arr);
  }
  return prevValue;
}

module.exports = shrinkArr;