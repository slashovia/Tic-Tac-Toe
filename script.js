const Gameboard = {
    createGameboard() {
        const rows = 3;
        const columns = 3;
        const matrix = Array(rows)
            .fill()
            .map(() => Array(columns).fill(0));
        return matrix;
    }
}

console.log(Gameboard.createGameboard());