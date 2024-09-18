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

        const info = document.createElement('p');
        info.textContent = `${name}'s marker: ${marker}`;
        infoPlayer.appendChild(info);

        return td;
    }

    const updateCurrentPlayerElement = player => {
        livePlayer.textContent = `Current Player: ${player.name}`;
    }

    const updateScorePlayerElement = player => {
        player.scoreElement.textContent = player.score;
    }

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
        updateScorePlayerElement(player)
    }

    const initializePlayer = () => {
        player1 = player.createPlayer('Hashmi', 'X');
        player2 = player.createPlayer('Fabrizio', 'O');
        currentPlayerRound = player1;
        currentPlayer = player1;
        updateCurrentPlayerElement(currentPlayer);
    }

    const resetRound = () => {
        switchTurnRound();
        cell.forEach(c => c.textContent = ''
        );
        makeMove();
    }

    const resetGame = () => {
        currentPlayerRound = player1;
        currentPlayer = player1;
        updateCurrentPlayerElement(currentPlayer);
        cell.forEach(c => c.textContent = ''
        );
        resetScore(player1);
        resetScore(player2);
        makeMove();
    }

    const makeMove = () => {
        cell.forEach(c => {
            c.removeEventListener('click', moveListener);
            c.addEventListener('click', moveListener)
        })
    };

    const moveListener = function () {
        if (this.textContent === '') {
            this.textContent = currentPlayer.marker;
            moveChecker();
            switchTurn();
        }
        else {
            alert('Warning, move not allowed. Try again.');
        }
    }

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
                increaseScore(currentPlayer);
                resetRound();
            }
        })
    }

    const switchTurn = () => {
        if (currentPlayer === player1) {
            currentPlayer = player2;
            updateCurrentPlayerElement(currentPlayer);
        }
        else {
            currentPlayer = player1;
            updateCurrentPlayerElement(currentPlayer);
        }
    }

    const switchTurnRound = () => {
        if (currentPlayerRound === player1) {
            currentPlayerRound = player2;
            updateCurrentPlayerElement(currentPlayerRound);
        }
        else {
            currentPlayerRound = player1;
            updateCurrentPlayerElement(currentPlayerRound);
        }
    }

    startBtn.addEventListener('click', makeMove);
    resetBtn.addEventListener('click', resetGame);

    initializePlayer();
})();












