module.exports = checkEquality;

function checkEquality (arr) {
	let isEqual = true;
	const reference = arr[0];

	for (let item of arr) {
		if (item !== reference) {
			isEqual = false;
		}
	}

	return isEqual;
}