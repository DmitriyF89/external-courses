function getMaxVal (arr) {
	let maxValue = 0;

	for (let item of arr) {
		if (item > maxValue) {
			maxValue = item;
		}
	}
	return maxValue;
}

module.exports = getMaxVal;