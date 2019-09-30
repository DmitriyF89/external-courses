function observeArray (arr) {
	
	for (let item of arr) {
		console.log(item);
	}
	console.log(`Number of items is ${arr.length}`);
}

module.exports = observeArray;