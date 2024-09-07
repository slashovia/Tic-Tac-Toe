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
    getScore = () => score;
    increaseScore = () => score++;
    resetScore = () => score = 0;
    makeMove = () => {
        let move = prompt(`${name}, make your move!`);
        let fixMove = move.split('');
        gameboard[fixMove[0]][fixMove[1]] = marker;
    }
    return { name, getScore, increaseScore, resetScore, makeMove };
};

function showScore(player) {
    console.log(`${player.name}: ${player.getScore()}`);
}

const gameboard = Gameboard.createGameboard();
const player1 = createPlayer('Hashmi', 'x');
const player2 = createPlayer('Antonio', 'o');
const showGrid = () => console.log(gameboard);

showGrid();
player1.makeMove();
player2.makeMove();








