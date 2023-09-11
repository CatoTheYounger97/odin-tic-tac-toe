

// objects 
// gameboard
// players

// GAME LOGIC
// start state = two players with assingned marks, clean board
// place mark in turns 
// 3 marks in a row is victory 
// reset 

// DISPLAY
// interraction with DOM for visuals 

// INPUT 
// handle input from player to DOM



const gameBoard = (() => {
    const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    const placeMark = (mark, location) => {
        if (board[location] === 0) {
            board[location] = mark;
        } else {
            // mark can't be placed
        }

        console.log(board);
    };

    const reset = () => {
        for (let i = 0; i < board.length; ++i)
        {
            board[i] = 0;
        }
    };

    return {
        placeMark,
        reset,
        board,
    };
})();

const displayInterface = (() => {
    const boardCells = document.querySelectorAll('.GameBoard');

    const displayUpdate = (gameBoard) => {
        for (let i = 0; i < gameBoard.length; ++i)
        {
            if (gameBoard[i] === 0) {
                continue;
            } else {
                boardCells[i].textContent = gameBoard[i];
            }
        }
    };

    return {
        boardCells,
        displayUpdate,
    };

})();


const Player = (playerMark) => {
    const mark = playerMark;
    let score = 0;

    return {mark};
};

const playerOne = Player('X');
const playerTwo = Player('O');

gameBoard.placeMark(playerOne.mark, 0);
displayInterface.displayUpdate(gameBoard.board);