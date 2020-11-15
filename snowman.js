const readline = require('readline-sync')
const Board = require ("./Board.js")
const dictionary = require ("./dictionary.js")
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("")

class Game {
  constructor(){
    this.name = readline.question("Hello! Please enter your name: ")
    this.magicWord = dictionary[Math.floor(Math.random() * dictionary.length)]
    this.wrongGuessesRemaining = 6
    this.guesses = []
    this.board = new Board(this.magicWord.length)
  }

  getMove() {
    return readline.question("Guess any letter:")
  }

  isCorrectGuess(letter) {
    if (this.magicWord.includes(letter)) {
      return true
    } else {
      return false
    }
  }

  isValidGuess(letter){
    if (alphabet.includes(letter) && this.guesses.includes(letter)){
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
  play(){
    while (!this.isGameOver()){
      let letter = this.getMove()
      while (!this.isValidGuess(letter)) {
        console.log("Sorry, that is not a valid guess.");
        this.wrongGuessesRemaining--
        letter = this.getMove()
      }
      if (this.isCorrectGuess(letter)) {
        this.placeLetter(letter)
        this.wrongGuessesRemaining--;
      } else {
        console.log("Incorrect!")
        this.wrongGuessesRemaining--;
      }
      // console.log(this.magicWord)
      this.board.displayBoard()
      console.log("You have " + this.wrongGuessesRemaining + " guesses left")
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

game.play()
