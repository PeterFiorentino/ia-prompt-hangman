class Board {
  constructor(wordLength){
    this.board = new Array(wordLength).fill("_")
  }
  isBoardComplete(){
    let complete = false;
    for (let i = 0; i < this.board.length; i++) {
      if(this.board[i] != "_") {
        complete = true;
      }
    }
    return complete
  }
  displayBoard(){
    console.log(this.board)
  }
}

module.exports = Board