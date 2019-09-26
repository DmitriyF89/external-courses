module.exports = getMaxValue;

function getMaxValue (arr) {
	let maxValue = 0;

	for (let item of arr) {
		if (item > maxValue) {
			maxValue = item;
		}
	}

	return maxValue;
}