class Calculator {
  constructor() {
    this.state = 0;
  }

  add(num = 0) {
    this.state += num;
    return this;
  };

  subtract(num = 0) {
    this.state -= num;
    return this;
  };

  divide(num = 1) {
    this.state /= num;
    return this;
  };

  multiply(num = 0) {
    this.state *= num;
    return this;
  };

  getResult() {
    return this.state;
  };

  reset() {
    this.state = 0;
    return this;
  };

  setState(num) {
    if (num) {
      this.state = num;
      return this
    }
    return this
  };

  fetchData(callback) {
    return new Promise((resolve) => {
      setTimeout(() => { resolve(callback(500)) }, 2000)
    })
  }
}

const calculator = new Calculator();

module.exports = calculator;