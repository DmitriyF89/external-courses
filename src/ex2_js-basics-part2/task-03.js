module.exports = checkArrayValues;

function checkArrayValues (arr) {
	let evenElements = 0;
	let oddElements = 0;
	let zeroElements = 0;

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

	const result = [];
	result.push(evenElements);
	result.push(oddElements);
	result.push(zeroElements);

	return result;
}