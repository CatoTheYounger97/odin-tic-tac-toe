
const gameBoard = (() => {
    const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let activePlayer = {};

    const placeMark = (location) => {
        if (board[location] === 0) {
            board[location] = gameBoard.activePlayer.mark;
            console.log(board);      
            return true;      
        } else {
            console.log(board);      
            return false;
        }
    };

    const fillRemainingBoard = () => {
        for (let i = 0; i < board.length; i++)
        {
            board[i] = '';
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
        fillRemainingBoard,
        reset,
        board,
        activePlayer,
    };
})();

const displayHandle = (() => {
    const boardCells = document.querySelectorAll('.GameBoard');
    const winStatusDiv = document.querySelector('#win-status');

    const displayUpdate = (winStatus) => {
        const board = gameBoard.board;
        for (let i = 0; i < board.length; ++i)
        {
            if (board[i] === 0 || board[i] === '') {
                continue;
            } else {
                boardCells[i].textContent = board[i];
            }
        }

        winStatusDiv.textContent = winStatus;


    };

    const reset = () => {
        for (let i = 0; i < boardCells.length; ++i)
        {
            boardCells[i].textContent = '';
        }
    };
    
    return {
        boardCells,
        displayUpdate,
        reset,
    };
    
})();

const inputHandle = (() => {
    const boardCells = document.querySelectorAll('.GameBoard')
    const resetButton = document.querySelector('#reset-button');

    const inputEvent = (button) => { 
     
        let markSuccess = true;
        
        switch (button.id)
        {
            case 'cell-1': markSuccess = gameBoard.placeMark(0); break;
            case 'cell-2': markSuccess = gameBoard.placeMark(1); break;
            case 'cell-3': markSuccess = gameBoard.placeMark(2); break;
            case 'cell-4': markSuccess = gameBoard.placeMark(3); break;
            case 'cell-5': markSuccess = gameBoard.placeMark(4); break;
            case 'cell-6': markSuccess = gameBoard.placeMark(5); break;
            case 'cell-7': markSuccess = gameBoard.placeMark(6); break;
            case 'cell-8': markSuccess = gameBoard.placeMark(7); break;
            case 'cell-9': markSuccess = gameBoard.placeMark(8); break;
        }
        
        if (markSuccess) {
            gameLogic.turn();
        }
    };


    const setupInput = () => {
        boardCells.forEach( (button) => {
            button.addEventListener('click', () => {
                inputEvent(button);
            });
        });

        resetButton.addEventListener('click', () => {
            gameLogic.reset();
        });

    };
    
    return {
        setupInput,
    };
})();


const Player = (playerMark) => {
    const mark = playerMark;
    let score = 0;

    return {mark, score};
};


const gameLogic = (() => {
    let playerOne = {};
    let playerTwo = {};
    let turnCount = 0;

    const setup = () => {
        playerOne = Player('X');
        playerTwo = Player('O');

        switchActivePlayer();

        inputHandle.setupInput();
    };

    const switchActivePlayer = () => {
        if (gameBoard.activePlayer === playerOne) {
            gameBoard.activePlayer = playerTwo;
        } else {
            gameBoard.activePlayer = playerOne;
        }

    };

    const checkWinCondition = () => {
        const winState = ['123', '456', '789', '147', '258', '369', '159', '357'];

        for (let i = 0; i < winState.length; ++i) 
        {
            const winCombo = winState[i].split('');

            const winString = gameBoard.board[winCombo[0]-1] + gameBoard.board[winCombo[1]-1] + gameBoard.board[winCombo[2]-1];
            console.log(winString);
            if (winString === 'XXX' || winString === 'OOO') {
                return true;
            }
        }
    };

    
    const turn = () => {

        let winStatus = '';
        if (checkWinCondition()) {
            console.log(gameBoard.activePlayer.mark + ' wins!');
            winStatus = gameBoard.activePlayer.mark + '\'s win';

            gameBoard.activePlayer.score++;
            
            displayHandle.displayUpdate(winStatus);
            endState();


        } else if (turnCount >= 8) {
            console.log('draw');
            winStatus = 'draw';

            displayHandle.displayUpdate(winStatus);
            endState();

        } else {
            // continue
        }

        switchActivePlayer();
        displayHandle.displayUpdate(winStatus);

        ++turnCount;

    };

    const endState = () => {

        gameBoard.fillRemainingBoard();
        gameBoard.activePlayer = {};
    };

    const reset = () => {
        gameBoard.reset();
        displayHandle.reset();
        turnCount = 0;
        winStatus = '';
        displayHandle.displayUpdate(winStatus);
    };

    return {
        setup,
        turn,
        reset,
    };

})();

gameLogic.setup();