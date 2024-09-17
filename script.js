
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
        player.scoreElement.textContent = player.score;
    }

    return {
        cell, infoPlayer, startBtn, resetBtn, createPlayerElement, updateCurrentPlayerElement, updateScorePlayerElement
    }
})();

const Player = (function () {

    const { createPlayerElement, updateScorePlayerElement } = domElements;

    const createPlayer = (name, marker) => {
        let score = 0;
        const scoreElement = createPlayerElement(name, marker, score);

        const increaseScore = () => {
            score++;
            updateScorePlayerElement({ score, scoreElement });
        }

        const resetScore = () => {
            score = 0;
            updateScorePlayerElement({ score, scoreElement });
        }

        return {
            name, marker, increaseScore, resetScore
        }
    }


    return { createPlayer };
})();


const functionGame = (function () {

    const { cell, startBtn, resetBtn, updateCurrentPlayerElement } = domElements;
    let player1, player2, currentPlayer;

    const initializePlayer = () => {
        player1 = Player.createPlayer('Hashmi', 'X');
        player2 = Player.createPlayer('Fabrizio', 'O');
        currentPlayer = player1;
    }

    const resetRound = () => {
        currentPlayer = player1;
        cell.forEach(c => c.textContent = '');
    }

    const resetGame = () => {
        resetRound();
        player1.resetScore();
        player2.resetScore();
    }

    const makeMove = () => {
        cell.forEach(c =>
            c.addEventListener('click', function () {
                if (this.textContent === '') {
                    this.textContent = currentPlayer.marker;
                    moveChecker();
                    switchTurn();
                }
                else {
                    alert('Warning, move not allowed. Try again.');
                }
            }))
    };

    const moveChecker = () => {
        const winConditions =
            [[0, 1, 2], [3, 4, 5], [6, 7, 8], //Check Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], //Check columns
            [0, 4, 8], [2, 4, 6]] //Check Diagonals

        winConditions.forEach(([a, b, c]) => {
            if (cell[a].textContent === cell[b].textContent &&
                cell[a].textContent === cell[c].textContent &&
                cell[a].textContent === currentPlayer.marker
            ) {
                alert(`${currentPlayer.name} wins!`);
                currentPlayer.increaseScore();
                resetRound();
            }
        })
    }

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

    const playGame = () => {
        initializePlayer();
        makeMove();
    }

    startBtn.addEventListener('click', playGame);
    resetBtn.addEventListener('click', resetGame);
})();
















