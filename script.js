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
            let move = prompt(`${name}, make your move (row,column)!`);
            let fixMove = move.split('');

            if (fixMove.length === 2 && gameboard[fixMove[0]] && gameboard[fixMove[0]][fixMove[1]] == '0') {
                gameboard[fixMove[0]][fixMove[1]] = marker;
                validMove = true;
            } else {
                alert('Warning, move not allowed. Try again.');
            }
        }
    };

    return { name, getScore, increaseScore, resetScore, makeMove };
}

function showScore(player) {
    console.log(`${player.name}: ${player.getScore()}`);
}

const gameboard = Gameboard.createGameboard();
const player1 = createPlayer('Hashmi', 'x');
const player2 = createPlayer('Antonio', 'o');
const showGrid = () => console.log(gameboard);

showGrid();
player1.makeMove();









