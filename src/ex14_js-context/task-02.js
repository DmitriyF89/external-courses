class Hangman {
  constructor(word) {
    this.word = word;
    this.letters = this.word.split('');
    this.playField = this.letters.map(() => '_');
    this.attempts = 6;
    this.wrongGuesses = [];
    this.count = 0;
  }

  getErrorsLeft() {
    return this.attempts;
  };

  getWrongSymbols() {
    return this.wrongGuesses;
  };

  getStatus() {
    return `${this.playField.join('')} | errors left ${this.attempts}`;
  };

  startAgain(word) {
    this.word = word;
    this.letters = this.word.split('');
    this.playField = this.letters.map(() => '_');
    this.attempts = 6;
    this.wrongGuesses = [];
    this.count = 0;

    return this;
  };

  getGuessedString() {
    return this.playField.join('');
  };

  guess(char) {
    if (this.attempts >= 1) {

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
    } else {
      console.log('You lost =(');
    }
    return this;
  }
}

const hangman = new Hangman('webpurple');

module.exports = hangman;