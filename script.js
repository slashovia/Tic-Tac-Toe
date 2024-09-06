const Gameboard = {
    createGameboard() {
        const rows = 3;
        const columns = 3;
        const matrix = Array(rows)
            .fill()
            .map(() => Array(columns).fill(0));
        return matrix;
    },

    createPlayer(playerName, marker) {
        if (marker === 'o' || marker === 'x') {
            return { playerName, marker };
        }
        return null;
    }
}

const gameboard = Gameboard.createGameboard();
console.log(gameboard);
const player1 = Gameboard.createPlayer('Hashmi', 'x');
console.log(player1);
const player2 = Gameboard.createPlayer('Antonio', 'o');
console.log(player2);