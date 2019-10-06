const calculator = {
  state: 0,

  add(num = 0) {
    state += num;
    return calculator.add;
  },

  subtract(num = 0) {
    state -= num;
    return calculator.subtract;
  },

  divide(num = 1) {
    state /= num;
    return calculator.divide;
  },

  multiply(num = 0) {
    state *= num;
    return calculator.multiply;
  },

  getResult() {
    return state;
  },

  reset() {
    state = 0;
  }
}

module.exports = calculator;