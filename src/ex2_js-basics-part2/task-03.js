function checkArrayValues (arr) {
	let evenElements, oddElements, zeroElements;
	evenElements = oddElements = zeroElements = 0;
	const result = [];

	arr
		.filter(item => typeof item === 'number')
		.forEach(item => {
			if (item === 0) {
				zeroElements++;
			} else if (item % 2 === 0) {
				evenElements++;
			} else {
				oddElements++;
			}
		});

	result.push(evenElements);
	result.push(oddElements);
	result.push(zeroElements);

	return result;
}

module.exports = checkArrayValues;