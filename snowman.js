const readline = require('readline-sync')
const Board = require ("./Board.js")
const dictionary = require ("./dictionary.js")
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("")

class Game {
  constructor(){
    this.name = readline.question("Hello! Please enter your name: ")
    //I like this addition! Makes the game more interactive for the user and fun to see their name at the end when they win.
    this.magicWord = dictionary[Math.floor(Math.random() * dictionary.length)]
    this.wrongGuessesRemaining = 6
    this.guesses = []
    //Try grouping wrongGuessesRemaining and guesses into an object!
    this.board = new Board(this.magicWord.length)
  }

  getMove() {
    return readline.question("Guess any letter:")
    //Your readline question implimentation is correct! 
    //I'd just like to see the magicWord (blocked with "_"s) and amount of guesses left before the user enters their first guess.
    //See .gif in the assignment's github repo https://github.com/joinpursuit/FSW-CLI-Snowman
  }

  isCorrectGuess(letter) {
    if (this.magicWord.includes(letter)) {
      return true
    } else {
      return false
    }
  }
  //Perfect use of .includes to check if a user's input is part of magicWord!

  isValidGuess(letter){
    if (alphabet.includes(letter) && this.guesses.includes(letter)){
      //"this.guesses.includes(letter)" makes it so we only consider letters the user guessed already as valid options, instead of letters in the alphabet.
      //This causes your user to enter a letter twice in order to have it as a valid option in the game which confuses game play. 
      //Consider what makes an input a valid guess and construct your condition accordingly.
      return true
    } else {
      return false
    }
  }

  isGameOver(){
    if (this.wrongGuessesRemaining <= 0 || this.board.isBoardComplete()){
      return true 
    } else {
      return false 
    }
  }
  placeLetter (letter){
    for (let i = 0; i < this.board.board.length;i++){
      if (this.magicWord[i] === letter){
        this.board.board[i] = letter
        this.guesses.push(letter)
      }
    }
  }

  //Both isGameOver() and placeLetter() are exactly what we're looking for in these functions! Good job. 

  play(){
    while (!this.isGameOver()){
      let letter = this.getMove()
      //I played a few rounds after fixing isValidGuess() and noticed that capitalized letters are considered valid guesses but are always wrong, even when they are included in magicWord.
      //This is because magicWord is getting words from a dictionary of entirely lower cased words.
      //Look at this resource for a solution https://www.w3schools.com/jsref/jsref_tolowercase.asp
      //Slack me if you have trouble implimenting it!
      while(!this.isValidGuess(letter)) {
        console.log("Sorry, that is not a valid guess.");
        this.wrongGuessesRemaining--
        letter = this.getMove()
      }
      if (this.isCorrectGuess(letter)) {
        this.placeLetter(letter)
        this.wrongGuessesRemaining--;
        // This line above will also subtract from a users guesses even when they guess correctly.
        // It is confusing for gameplay and also makes words over 6 unique letters impossible to correctly guess.
      } else {
        console.log("Incorrect!")
        this.wrongGuessesRemaining--;
      }
    
      this.board.displayBoard()
      console.log("You have " + this.wrongGuessesRemaining + " guesses left")
      //I'd also love for a user to be able to see the letters they have already guessed (both correct and incorrect) to prevent them from guessing the same letter twice.
    }

  }

}

let game = new Game()
if (game.isGameOver() && game.wrongGuessesRemaining > 0){
      console.log(`Congratulations, ${game.name}! You win!`)

} 
else if (game.isGameOver() && game.wrongGuessesRemaining <= 0){
  console.log("Sorry, you lost. The word was " + game.magicWord);
  
}
//This if and else if will never hit here. 
//If they both require game.isGameOver() to be true then let's try move them to the part of play() where isGameOver() is true!
//Also, as the user, I'd love to see how guesses it took me to complete the game if I won
//If I lose, I'd like to see the word revealed to me!
game.play()
