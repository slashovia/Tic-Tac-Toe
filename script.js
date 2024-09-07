const Gameboard = (function () {
    const createGameboard = () => {
        const rows = 3;
        const columns = 3;
        const matrix = Array(rows)
            .fill()
            .map(() => Array(columns).fill(0));
        return matrix;
    };
    return { createGameboard }
})();

function createPlayer(name, marker) {
    let score = 0;
    const getScore = () => score;
    const increaseScore = () => score++;
    const resetScore = () => score = 0;
    const makeMove = () => {
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
    return { name, getScore, increaseScore, resetScore, makeMove };
}

const player1 = createPlayer('Hashmi', 'x');
const player2 = createPlayer('Antonio', 'o');
const gameboard = Gameboard.createGameboard();

const functionGame = (function (player1, player2, gameboard) {
    let currentPlayer = player1;

    const showGrid = () => console.log(gameboard);

    const switchTurn = () => {
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
    }

    const playGame = () => {
        showGrid();
        let gameOver = false;
        while (!gameOver) {
            currentPlayer.makeMove();
            switchTurn();
        }
    };

    function showScore(player) {
        console.log(`${player.name}: ${player.getScore()}`);
    }

    return { playGame };
})(player1, player2, gameboard);




functionGame.playGame();










