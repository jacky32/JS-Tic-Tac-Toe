const game = (() => {
  // doesn't work yet
  const checkWin = (board) => {
    for (let i = 0; i < board.length; i++) {
      if (board[i][0] == board[i][1] == board[i][2] && board[i][0] != 0) {
        announceWinner(board[i][0]);
      } else if (board[0][i] == board[1][i] == board[2][i] && board[0][i] != 0) {
        announceWinner(board[0][i]);
      } else {
        return false;
      }
    }
  };

  const announceWinner = (mark) => {
    console.log(`${mark} won.`);
  }
  return {checkWin};
})();

const gameBoard = (() => {
  let board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  
  const change = (row, column, mark) => {
    if (board[row][column] == 0) {
      board[row][column] = mark;
    } else {
      return false;
    }
  };

  const reset = () => board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

  const get = () => board;

  const check = (row, column) => {
    if (board[row][column] == '') {
      return true;
    } else {
      return false;
    }
  }

  return {change, get, reset, check, board};
})();

const gameController = (() => {
  let currentPlayer = 'x';

  const tiles = document.getElementsByClassName('tile');
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener('click', () => changeTile(tiles[i], i));
  };

  const changeTile = (tile, id) => {
    const row = convertId(id)[0];
    const column = convertId(id)[1];

    if (gameBoard.check(row, column)){
      gameBoard.change(row, column, currentPlayer);
      displayController.draw(tile, currentPlayer);
      switchPlayer();
      game.checkWin(gameBoard.board);
    }
  };

  const convertId = (id) => {
    switch (id) {
      case 0: 
        return [[0], [0]];
      case 1: 
        return [[0], [1]];
      case 2: 
        return [[0], [2]];
      case 3: 
        return [[1], [0]];
      case 4: 
        return [[1], [1]];
      case 5: 
        return [[1], [2]];
      case 6: 
        return [[2], [0]];
      case 7: 
        return [[2], [1]];
      case 8: 
        return [[2], [2]];
    }
  };

  const switchPlayer = () => {
    if (currentPlayer == 'x') {
      currentPlayer = 'o';
    } else {
      currentPlayer = 'x';
    }
  };
})();

const displayController = (() => {
  const draw = (tile, mark) => {
    tile.innerHTML = mark;
  };

  return {draw};
})();

const Player = (name, mark) => {

};