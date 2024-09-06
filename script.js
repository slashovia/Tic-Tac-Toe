const Gameboard = (function () {
    const createGameboard = () => {
        const rows = 3;
        const columns = 3;
        const matrix = Array(rows)
            .fill()
            .map(() => Array(columns).fill(0));
        return matrix;
    };

    const createPlayer = (name, marker) => {
        let score = 0;
        getScore = () => score;
        increaseScore = () => score++;
        resetScore = () => score = 0;
        makeMove = () => {
            let move = prompt(`${name}, make your move!`);
            let fixMove = move.split('');
            gameboard[fixMove[0]][fixMove[1]] = marker;
        }
        return { getScore, increaseScore, resetScore, makeMove };
    };
    return { createGameboard, createPlayer }
})();

const showGrid = () => console.log(gameboard);
const gameboard = Gameboard.createGameboard();
const player1 = Gameboard.createPlayer('Hashmi', 'x');
const player2 = Gameboard.createPlayer('Antonio', 'o');

// player1.makeMove();
// player2.makeMove();
// showGrid();








