const domElements = (function () {
    const cell = document.querySelectorAll('.cell');
    const livePlayer = document.querySelector('.current-player');
    const infoPlayer = document.querySelector('.info');
    const tHead = document.querySelector('thead tr');
    const tBody = document.querySelector('tbody tr');
    const startBtn = document.querySelector('#startBtn');
    const resetBtn = document.querySelector('#resetBtn');

    const createPlayerElement = (name, marker, score) => {
        const th = document.createElement('th');
        th.textContent = `${name}`;
        tHead.appendChild(th);

        const td = document.createElement('td');
        td.textContent = `${score}`;
        tBody.appendChild(td);

        const info = document.createElement('p');
        info.textContent = `${name}'s marker: ${marker}`;
        infoPlayer.appendChild(info);

        return td;
    }

    const updateCurrentPlayerElement = player => {
        livePlayer.textContent = 'Current Player: ' + player.name;
    }
    const updateScorePlayerElement = (player) => {
        player.scoreElement.textContent = `${player.score}`;
    }
    return {
        cell, livePlayer, infoPlayer, tBody, tHead, startBtn, resetBtn, createPlayerElement, updateCurrentPlayerElement, updateScorePlayerElement
    }
})();

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

    const createPlayer = (name, marker) => {
        let score = 0;

        const { createPlayerElement, updateScorePlayerElement } = domElements;

        const scoreElement = createPlayerElement(name, marker, score);

        const increaseScore = () => {
            score++;
            updateScorePlayerElement({ score, scoreElement });
        }

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

        return { score, makeMove, increaseScore, name, marker }
    }
    return { createPlayer };
})();

const player1 = Player.createPlayer('Hashmi', 'X');
const player2 = Player.createPlayer('Fabrizio', 'O');
const gameboard = Gameboard.createGameboard();

const functionGame = (function (player1, player2, gameboard) {

    const { startBtn, updateCurrentPlayerElement } = domElements;
    const { createGameboard } = Gameboard;
    let currentPlayer = player1;
    let gameOver = false;

    const showGrid = () => console.log(gameboard);

    const switchTurn = () => {
        if (currentPlayer === player1) {
            currentPlayer = player2;
            updateCurrentPlayerElement(player2);
        }
        else {
            currentPlayer = player1;
            updateCurrentPlayerElement(player1);
        }
    }

    const resetRound = () => {
        currentPlayer = player1;
        gameboard = createGameboard();
        return gameOver = true;
    }

    const moveChecker = () => {

        //Check rows
        gameboard.forEach(row => {
            if (row.every(cell => cell === player1.marker)) {
                console.log(`${player1.name} wins!`);
                player1.increaseScore();
                resetRound();

            }

            else if (row.every(cell => cell === player2.marker)) {
                console.log(`${player2.name} wins!`);
                player2.increaseScore();
                resetRound();
            }
        }
        );

        //Check columns
        for (let i = 0; i < gameboard.length; i++) {
            if (gameboard.every(row => row[i] === player1.marker)) {
                console.log(`${player1.name} wins!`);
                player1.increaseScore();
                resetRound();
            }
            else if (gameboard.every(row => row[i] === player2.marker)) {
                console.log(`${player2.name} wins!`);
                player2.increaseScore();
                resetRound();
            }
        }

        // Check diagonals
        if ((gameboard[0][0] === player1.marker && gameboard[1][1] === player1.marker && gameboard[2][2] === player1.marker) || (gameboard[0][2] === player1.marker && gameboard[1][1] === player1.marker && gameboard[2][0] === player1.marker)) {
            console.log(`${player1.name} wins!`);
            player1.increaseScore();
            resetRound();
        }
        else if ((gameboard[0][0] === player2.marker && gameboard[1][1] === player2.marker && gameboard[2][2] === player2.marker) || (gameboard[0][2] === player2.marker && gameboard[1][1] === player2.marker && gameboard[2][0] === player2.marker)) {
            console.log(`${player2.name} wins!`);
            player2.increaseScore();
            resetRound();
        }
    }

    const playGame = () => {
        showGrid();
        gameOver = false;
        while (!gameOver) {
            currentPlayer.makeMove();
            moveChecker();
            switchTurn();
        }
    };


    startBtn.addEventListener('click', playGame);

})(player1, player2, gameboard);







