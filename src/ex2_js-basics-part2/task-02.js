function observeArr(arr) {
	for (let i = 0; i < arr.length; i++) {
		console.log(arr[i]);
	}
	console.log(`Number of items is ${arr.length}`);
}

module.exports = observeArr;