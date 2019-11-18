function Hangman(word) {
  this.word = word;
  this.letters = this.word.split('');
  this.playField = this.letters.map(() => '_');
  this.attempts = 6;
  this.wrongGuesses = [];
  this.count = 0;
}

Hangman.prototype.getErrorsLeft = function () {
  return this.attempts;
}

Hangman.prototype.getWrongSymbols = function () {
  return this.wrongGuesses;
}

Hangman.prototype.getStatus = function () {
  return `${this.playField.join('')} | errors left ${this.attempts}`;
}

Hangman.prototype.startAgain = function (word) {
  this.word = word;
  this.letters = this.word.split('');
  this.playField = this.letters.map(() => '_');
  this.attempts = 6;
  this.wrongGuesses = [];
  this.count = 0;
  return this;
}

Hangman.prototype.getGuessedString = function () {
  return this.playField.join('');
};

Hangman.prototype.guess = function (char) {
  if (this.attempts < 1) {
    console.log('You lost =(');
    return this;
  }

  if (this.letters.includes(char)) {
    this.letters.forEach((element, index) => {
      if (element === char) {
        this.playField[index] = char;
        this.count++;
      }
    });

    if (this.count === this.word.length) {
      console.log(`${this.playField.join('')} | You won!`);
    } else {
      console.log(this.playField.join(''));
    }

  } else {
    this.wrongGuesses.push(char);
    this.attempts--;
    console.log(`Wrong letter, errors left ${this.attempts} | ${this.wrongGuesses.join(',')}`)
  }
  return this;
}

const hangman = new Hangman('webpurple');

module.exports = hangman;