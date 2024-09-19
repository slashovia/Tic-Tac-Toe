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
        th.textContent = name;
        tHead.appendChild(th);

        const td = document.createElement('td');
        td.textContent = score;
        tBody.appendChild(td);

        const infoName = document.createElement('p');
        infoName.textContent = `${name}'s marker: `;
        infoPlayer.appendChild(infoName);

        const infoMarker = document.createElement('span');
        infoMarker.textContent = marker;
        infoName.appendChild(infoMarker);

        return td;
    }

    const updateCurrentPlayerElement = player => {
        livePlayer.textContent = `Current Player: `;

        const currentPlayerName = document.createElement('span');
        currentPlayerName.textContent = player.name;
        livePlayer.appendChild(currentPlayerName);
    }

    const updateScorePlayerElement = player => {
        player.scoreElement.textContent = player.score;
    }

    cell.forEach(function (cellElement) {
        cellElement.addEventListener('mouseover', function () {
            if (this.textContent === '') {
                this.style.border = '5px solid limegreen';
            }
            else {
                this.style.border = '5px solid tomato';
            }
        })
        cellElement.addEventListener('mouseout', function () {
            this.style.border = '';
        })
    });
    return {
        cell, infoPlayer, startBtn, resetBtn, createPlayerElement, updateCurrentPlayerElement, updateScorePlayerElement
    }
})();

const player = (function () {
    const { createPlayerElement } = domElements;

    const createPlayer = (name, marker) => {
        let score = 0;
        const scoreElement = createPlayerElement(name, marker, score);

        return {
            name, marker, scoreElement, score
        }
    }

    return { createPlayer };
})();

const functionGame = (function () {
    const { cell, startBtn, resetBtn, updateCurrentPlayerElement, updateScorePlayerElement } = domElements;
    let player1, player2, currentPlayer, currentPlayerRound;

    const increaseScore = player => {
        player.score++;
        updateScorePlayerElement(player);
    }

    const resetScore = player => {
        player.score = 0;
        updateScorePlayerElement(player);
    }

    const initializePlayer = () => {
        player1 = player.createPlayer('Hashmi', 'X');
        player2 = player.createPlayer('Fabrizio', 'O');
        currentPlayerRound = player1;
        currentPlayer = player1;
        updateCurrentPlayerElement(currentPlayer);
        makeMove();
    }

    const resetRound = () => {
        switchTurnRound();
        cell.forEach(c => c.textContent = '');
        makeMove();
    }

    const resetGame = () => {
        currentPlayerRound = player1;
        currentPlayer = player1;
        updateCurrentPlayerElement(currentPlayer);
        cell.forEach(c => c.textContent = '');
        resetScore(player1);
        resetScore(player2);
        makeMove();
    }

    const makeMove = () => {
        cell.forEach(c => {
            c.removeEventListener('click', moveListener);
            c.addEventListener('click', moveListener);
        });
    };

    const moveListener = function () {
        if (this.textContent === '') {
            this.textContent = currentPlayer.marker;
            moveChecker();
        } else {
            alert('Warning, move not allowed. Try again.');
        }
    }

    const moveChecker = () => {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        let winner = false;

        winConditions.forEach(([a, b, c]) => {
            if (cell[a].textContent &&
                cell[a].textContent === cell[b].textContent &&
                cell[a].textContent === cell[c].textContent) {
                winner = true;

                setTimeout(() => {
                    alert(`${currentPlayer.name} wins!`);
                    increaseScore(currentPlayer);
                    resetRound();
                }, 50);
            }
        });

        // Check for tie
        if (!winner) {
            const allFilled = Array.from(cell).every(c => c.textContent);
            if (allFilled) {
                setTimeout(() => {
                    alert(`It's a tie!`);
                    resetRound();
                }, 50);
            } else {
                switchTurn(); // Only switch turns if there is no tie or winner
            }
        }
    }

    const switchTurn = () => {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
        updateCurrentPlayerElement(currentPlayer);
    }

    const switchTurnRound = () => {
        if (currentPlayerRound === player1) {
            currentPlayerRound = player2;
        } else {
            currentPlayerRound = player1;
        }
        currentPlayer = currentPlayerRound;
        updateCurrentPlayerElement(currentPlayer);
    }

    startBtn.addEventListener('click', makeMove);
    resetBtn.addEventListener('click', resetGame);

    initializePlayer();
})();
