function checkArrValues (arr) {
	const result = [0, 0, 0];

	for (let i = 0; i < arr.length; i++) {
		if (typeof arr[i] === 'number') {
			if (arr[i] === 0) {
				result[2] += 1;
			} else if (arr[i] % 2 === 0) {
				result[0] += 1;
			} else {
				result[1] += 1;
			}
		}
	}
	return result;
}

module.exports = checkArrValues;