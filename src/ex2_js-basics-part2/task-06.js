module.exports = checkPrime;

function checkPrime (num) {
	let isPrime, result;
	isPrime = true;

	if (num > 1 && num <= 1000) {

		for (let i = 2; i < num; i++) {
			if(num % i === 0) {
				isPrime = false;
			}
		}

		result = isPrime ? `Число ${num} - простое число` : `Число ${num} - составное число`;

	} else if (num > 1000){

		result = 'Данные неверны';
	}
	return result;
}