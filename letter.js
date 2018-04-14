var lettersToDisplay = function (word, goodGuesses) {
  this.gameWord = word;
  this.goodLetters = goodGuesses;
  this.displayText = '';
  this.winner = false; // Default set to loss

  this.parseDisplay = function () {
    var shown = ''; // What the user sees.
    if (this.goodLetters == undefined) {
      for (var i = 0; i < this.gameWord.length; i++) {
        shown += ' _ ';
      }
    }
    else {
      for (var i = 0; i < this.gameWord.length; i++) {
        var letterCorrect = false;
        for (var k = 0; k < this.gameWord.length; k++) {
          if (this.gameWord[i] == this.goodLetters[k]) {
            shown += this.goodLetters[k];
            letterCorrect = true;
          }
        }
        if (!letterCorrect) {
          shown += ' _ ';
        }
      }
    }
    this.displayText = shown.trim();
    console.log(this.displayText);
    if (this.displayText == this.gameWord) {
      this.winner = true;
    }
  }
}

module.exports = lettersToDisplay;