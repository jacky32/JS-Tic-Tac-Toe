const game = (() => {
  // doesn't work yet
  const checkWin = (board) => {
    for (let i = 0; i < board.length; i++) {
      if (board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != 0) {
        return true;
      } else if (board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i] != 0) {
        return true;
      } else {
        return false;
      }
    }
  };
  return {checkWin}
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

  const reset = () => {
    for(i = 0; i < 3; i++) {
      for(x = 0; x < 3; x++) {
        board[i][x] = 0;
      }
    }
  };

  const check = (row, column) => {
    if (board[row][column] == '') {
      return true;
    } else {
      return false;
    }
  }

  return {change, reset, check, board}
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
      if (game.checkWin(gameBoard.board) == true) {
        announceWinner();
        gameBoard.reset();
        displayController.clear(tiles);
      }
      switchPlayer();
    }
  };

  const announceWinner = () => {
    console.log(`${currentPlayer} won!`);
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

  const clear = (tiles) => {
    for (let i = 0; i < tiles.length; i++) {
      tiles[i].innerHTML = '';
    }
  };

  return {draw, clear}
})();

const Player = (name, mark) => {

};