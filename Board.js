class Board {
  constructor(wordLength){
    this.board = new Array(wordLength).fill("_")
    //I like this way of approaching making an array of equal length but filled with "_"s
    //A lot cleaner than looping through the length of magicWord and adding "_" to a new array for every instance
  }
  isBoardComplete(){
    let complete = false;
    for (let i = 0; i < this.board.length; i++) {
      if(this.board[i] != "_") {
        complete = true;
      }
    }

    return complete
    //The way this check is set up it will only return true/false based on whether or not the last letter (this.board[this.board.length -1]) === "_"
    //Remember, a completed word is on that does not include any "_"s
    //The logic to solving this is similar to your isCorrectGuess function in snowman.js
  }
  displayBoard(){
    console.log(this.board)
  }
}

module.exports = Board