
function createGameboard() {
    const rows = 3;
    const columns = 3;
    const matrix = Array(rows)
        .fill()
        .map(() => Array(columns).fill());
    return matrix;
}


console.log(createGameboard());