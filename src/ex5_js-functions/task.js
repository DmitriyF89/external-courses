const Calculator = {
  state: 0,

  add(num = 0) {
    state += num;
    return Calculator.add;
  },

  subtract(num = 0) {
    state -= num;
    return Calculator.subtract;
  },

  divide(num = 1) {
    state /= num;
    return Calculator.divide;
  },

  multiply(num = 0) {
    state *= num;
    return Calculator.multiply;
  },

  getResult() {
    return state;
  },

  reset() {
    state = 0;
  }
}

module.exports = Calculator;