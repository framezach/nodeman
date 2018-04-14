// Packages
var inquirer = require('inquirer');
var wordsList = require('./words.js');
var checkLetter = require('./check.js');
var display = require('./letter.js');

var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
  'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
  't', 'u', 'v', 'w', 'x', 'y', 'z'];

var guessed = [];
var correctlyGuessed = [];
var displayHangman;

var game = {
  wordBank: wordsList, // Imported
  guessesRemaining: 10,
  currentWord: null,

  startGame: function () {
    this.guessesRemaining = 10;
    guessed = [];
    correctlyGuessed = [];
    var j = Math.floor(Math.random() * this.wordBank.length);
    this.currentWord = this.wordBank[j];

    console.log("Let's Play Hangman");

    displayHangman = new display(this.currentWord);
    displayHangman.parseDisplay();
    console.log('Guesses Left = ' + game.guessesRemaining);

    promptUser();
  }
};

function promptUser() {
  console.log('');

  if (game.guessesRemaining > 0) {
    inquirer.prompt([
      {
        type: "value",
        name: "letter",
        message: "Guess a letter! "
      }
    ]).then(function (userInput) {
      var inputLetter = userInput.letter.toLowerCase();
      if (alphabet.indexOf(inputLetter) == -1) {
        console.log(inputLetter + " is not a letter. " + guessesRemaining + " guesses reamining.")
        promptUser();
      }
      else if (alphabet.indexOf(inputLetter) != -1 && guessed.indexOf(inputLetter) != -1) {
        console.log('Already guessed that letter! Guess again.');
        promptUser();
      }
      else {
        guessed.push(inputLetter);

        var letterCorrect = checkLetter(inputLetter, game.currentWord);
        if (letterCorrect) {
          correctlyGuessed.push(inputLetter);
          game.guessesRemaining++;
          displayHangman = new display(game.currentWord, correctlyGuessed);
          displayHangman.parseDisplay();
        }
        if (displayHangman.winner) {
          console.log("Winner winner chicken dinner!");
          inquiring();
        } else {
          game.guessesRemaining--;
          console.log("Keep going!");
          console.log(game.guessesRemaining + " guesses remain.");
          promptUser();
        }
      }
    })
  }
  else {
    console.log("Sorry, try again. The word was: " + game.currentWord);
    inquiring();
  }
}

// Our play again function. I decided to go with a checkbox but there's countless other options.
function inquiring() {
  inquirer.prompt([{
    type: "checkbox",
    name: "playAgain",
    message: "Play Again?!",
    choices: ["You bet!", "No more... Please..."]
  }]).then(function (user) {
    if (user.playAgain == "You bet!") {

      game.startGame();
    } else if (user.playAgain == "No more... Please...") {
      console.log("Thanks for playing!")
    }
  });
}

game.startGame();

