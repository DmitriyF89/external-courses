module.exports = getValue;

function getValue (value) {
	
	if (typeof value === 'number') {
		return 'number';
	} else if (typeof value === 'string') {
		return 'string';
	}
	return undefined;
}