const game = (() => {
  const checkWin = (board) => {
    for (let i = 0; i < board.length; i++) {
      // check for horizontal lines
      if (
        board[i][0] == board[i][1] &&
        board[i][1] == board[i][2] &&
        board[i][0] != 0
      ) {
        return true;
        // check for vertical lines
      } else if (
        board[0][i] == board[1][i] &&
        board[1][i] == board[2][i] &&
        board[0][i] != 0
      ) {
        return true;
      }
    }
    // check for diagonal lines
    if (
      board[0][0] == board[1][1] &&
      board[1][1] == board[2][2] &&
      board[0][0] != 0
    ) {
      return true;
    } else if (
      board[0][2] == board[1][1] &&
      board[1][1] == board[2][0] &&
      board[0][2] != 0
    ) {
      return true;
    } else {
      return false;
    }
  };
  return { checkWin };
})();

const gameBoard = (() => {
  let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const change = (row, column, mark) => {
    if (board[row][column] == 0) {
      board[row][column] = mark;
    } else {
      return false;
    }
  };

  const reset = () => {
    for (i = 0; i < 3; i++) {
      for (x = 0; x < 3; x++) {
        board[i][x] = 0;
      }
    }
  };

  const check = (row, column) => {
    if (board[row][column] == "") {
      return true;
    } else {
      return false;
    }
  };

  return { change, reset, check, board };
})();

const Player = (name, mark) => {
  let score = 0;

  const rename = (newName) => {
    name = newName;
  };

  const getScore = () => score;
  const getName = () => name;
  const getMark = () => mark;
  const addScore = () => score++;

  return { getScore, getMark, getName, rename, addScore };
};

const gameController = (() => {
  const playerOne = Player("Player 1", "x");
  const playerTwo = Player("Player 2", "o");
  let currentPlayer = playerOne;

  const changeTile = (tile, id) => {
    const row = convertId(id)[0];
    const column = convertId(id)[1];

    if (gameBoard.check(row, column)) {
      gameBoard.change(row, column, currentPlayer.getMark());
      displayController.draw(tile, currentPlayer.getMark());
      if (game.checkWin(gameBoard.board) == true) {
        announceWinner();
        currentPlayer.addScore();
        displayController.updateScore(
          playerOne.getScore(),
          playerTwo.getScore()
        );
        displayController.showWinnerModal(currentPlayer);
        reset();
      }
      switchPlayer();
    }
  };

  const reset = () => {
    gameBoard.reset();
    displayController.clear();
  };

  const announceWinner = () => {
    console.log(`${currentPlayer.getName()} won!`);
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
    if (currentPlayer == playerOne) {
      currentPlayer = playerTwo;
    } else {
      currentPlayer = playerOne;
    }
  };

  const validateNewName = (event, player, name) => {
    event.preventDefault();
    newName = name.value;
    if (newName.length <= 9) {
      displayController.changePlayerName(player, newName);
      if (player.id == "player-one-name") {
        playerOne.rename(newName);
      } else {
        playerTwo.rename(newName);
      }
    }
  };

  return { changeTile, reset, validateNewName };
})();

const displayController = (() => {
  const tiles = document.getElementsByClassName("tile");
  const winnerModal = document.getElementById("winner-modal");
  winnerModal.addEventListener("click", () => toggleWinnerModal());

  const playerOne = document.getElementById("player-one-name");
  playerOne.addEventListener("click", () =>
    changeNamePopup("player-one-name-popup")
  );

  const playerTwo = document.getElementById("player-two-name");
  playerTwo.addEventListener("click", () =>
    changeNamePopup("player-two-name-popup")
  );

  document.getElementById("player-one-form").addEventListener("submit", (e) => {
    const name = document.getElementById("player-one-name-field");
    gameController.validateNewName(e, playerOne, name);
    changeNamePopup("player-one-name-popup");
  });

  document.getElementById("player-two-form").addEventListener("submit", (e) => {
    const name = document.getElementById("player-two-name-field");
    gameController.validateNewName(e, playerTwo, name);
    changeNamePopup("player-two-name-popup");
  });

  for (let i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener("click", () =>
      gameController.changeTile(tiles[i], i)
    );
  }
  const toggleWinnerModal = () => {
    winnerModal.classList.toggle("hidden");
  };

  const showWinnerModal = (winner) => {
    toggleWinnerModal();
    winnerModal.children[0].innerText = `${winner.getName()} has won! Continue?`;
  };

  const changeNamePopup = (player) => {
    document.getElementById(player).classList.toggle("hidden");
  };

  const changePlayerName = (player, newName) => {
    player.innerText = newName;
  };

  const draw = (tile, mark) => {
    tile.innerHTML = mark;
  };

  const clear = () => {
    for (let i = 0; i < tiles.length; i++) {
      tiles[i].innerHTML = "";
    }
  };

  const updateScore = (playerOneScore, playerTwoScore) => {
    document.getElementById("player-one-score").innerText = playerOneScore;
    document.getElementById("player-two-score").innerText = playerTwoScore;
  };

  return { draw, clear, changePlayerName, updateScore, showWinnerModal };
})();
