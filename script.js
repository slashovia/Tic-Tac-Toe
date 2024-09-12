const domElements = {
    cell: document.querySelectorAll('.cell'),
    livePlayer: document.querySelector('.current-player'),
    scorePlayer1: document.querySelector('.scoreboard td:first-child'),
    scorePlayer2: document.querySelector('.scoreboard td:last-child'),
    startBtn: document.querySelector('#startBtn'),
    resetBtn: document.querySelector('#resetBtn'),
    restartBtn: document.querySelector('#restartBtn'),
};

const Gameboard = (function () {
    createGameboard = () => {
        const rows = 3;
        const columns = 3;
        const matrix = Array(rows)
            .fill()
            .map(() => Array(columns).fill(0));
        return matrix;
    };
    return { createGameboard }
})();

const Player = (function () {
    createPlayer = (name, marker) => {
        let score = 0;
        makeMove = () => {
            let validMove = false;
            while (!validMove) {
                let move = prompt(`${name}, make your move (row and column)!`);
                let fixMove = move.split('').map(Number);
                if (fixMove.length === 2 &&
                    fixMove[0] >= 0 && fixMove[0] <= 2 &&
                    fixMove[1] >= 0 && fixMove[1] <= 2 &&
                    gameboard[fixMove[0]][fixMove[1]] === 0) {

                    gameboard[fixMove[0]][fixMove[1]] = marker;
                    validMove = true;

                }
                else {
                    alert('Warning, move not allowed. Try again.');
                }

            };
        }
        return { score, makeMove, name, marker }
    }
    return { createPlayer };
})();

const player1 = Player.createPlayer('Player 1', 'x');
const player2 = Player.createPlayer('Player 2', 'o');
const gameboard = Gameboard.createGameboard();

const functionGame = (function (player1, player2, gameboard) {

    let currentPlayer = player1;
    let gameOver = false;

    increaseScore = player => player.score++;

    showScore = () => {
        console.log(`${player1.name}: ${player1.score}`);
        console.log(`${player2.name}: ${player2.score}`);
    }

    showGrid = () => console.log(gameboard);


    switchTurn = () => {
        const { livePlayer } = domElements;
        if (currentPlayer === player1) {
            currentPlayer = player2;
            livePlayer.textContent = 'Current Player: ' + player2.name;
        }
        else {
            currentPlayer = player1;
            livePlayer.textContent = 'Current Player: ' + player1.name;
        }
    }

    moveChecker = () => {

        //Check rows
        gameboard.forEach(row => {
            if (row.every(cell => cell === player1.marker)) {
                console.log(`${player1.name} wins!`);
                increaseScore(player1);
                return gameOver = true;

            }

            else if (row.every(cell => cell === player2.marker)) {
                console.log(`${player2.name} wins!`);
                increaseScore(player2);
                return gameOver = true;
            }
        }
        );

        //Check columns
        for (let i = 0; i < gameboard.length; i++) {
            if (gameboard.every(row => row[i] === player1.marker)) {
                console.log(`${player1.name} wins!`);
                increaseScore(player1);
                return gameOver = true;
            }
            else if (gameboard.every(row => row[i] === player2.marker)) {
                console.log(`${player2.name} wins!`);
                increaseScore(player2);
                return gameOver = true;
            }
        }

        // Check diagonals
        if ((gameboard[0][0] === player1.marker && gameboard[1][1] === player1.marker && gameboard[2][2] === player1.marker) || (gameboard[0][2] === player1.marker && gameboard[1][1] === player1.marker && gameboard[2][0] === player1.marker)) {
            console.log(`${player1.name} wins!`);
            increaseScore(player1);
            return gameOver = true;
        }
        else if ((gameboard[0][0] === player2.marker && gameboard[1][1] === player2.marker && gameboard[2][2] === player2.marker) || (gameboard[0][2] === player2.marker && gameboard[1][1] === player2.marker && gameboard[2][0] === player2.marker)) {
            console.log(`${player2.name} wins!`);
            increaseScore(player2);
            return gameOver = true;
        }
    }

    playGame = () => {
        showGrid();
        showScore();
        while (!gameOver) {
            currentPlayer.makeMove();
            moveChecker();
            switchTurn();
        }
    };


    return { playGame, currentPlayer };
})(player1, player2, gameboard);

functionGame.playGame();







