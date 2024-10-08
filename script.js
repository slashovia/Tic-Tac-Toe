const domElements = (function () {
    const dialog = document.querySelector('dialog');
    const backdrop = document.querySelector('.backdrop')
    const inputName = document.querySelectorAll('dialog input[type="text"]');
    const radioContainer = document.querySelectorAll('.radio-container');
    const submitBtn = document.querySelector('#submitBtn');
    const closeBtn = document.querySelector('#closeBtn');
    const cells = document.querySelectorAll('.cell');
    const livePlayer = document.querySelector('.current-player');
    const infoPlayer = document.querySelector('.info');
    const tHead = document.querySelector('thead tr');
    const tBody = document.querySelector('tbody tr');
    const startBtn = document.querySelector('#startBtn');
    const resetBtn = document.querySelector('#resetBtn');
    let player1, player2;

    const getCells = () => cells;
    const getPlayer1 = () => player1;
    const getPlayer2 = () => player2;

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

    const updateCurrentPlayerElement = () => {

        const { getCurrentPlayer } = functionGame;
        livePlayer.textContent = `Current Player: `;

        let currentPlayer = getCurrentPlayer();
        const currentPlayerName = document.createElement('span');
        currentPlayerName.textContent = currentPlayer.name;
        livePlayer.appendChild(currentPlayerName);
    }

    const updateScorePlayerElement = player => {
        player.scoreElement.textContent = player.getScore();
    }

    const mouseClick = (cell, player) => {

        if (cell.style.border === '5px solid limegreen') {
            cell.textContent = player.marker;
            cell.style.color = 'black';
            cell.style.border = '';
            functionGame.moveChecker();
        } else {
            alert('Warning, move not allowed. Try again.');
        }
    }

    const mouseOver = (cell, player) => {
        if (cell.textContent === '') {
            cell.style.border = '5px solid limegreen';
            cell.textContent = player.marker;
            cell.style.color = 'rgba(0, 0, 0, 0.3)';
        }
        else {
            cell.style.border = '5px solid tomato';
        }
    };

    const mouseOut = cell => {
        if (cell.style.color === 'rgba(0, 0, 0, 0.3)') {
            cell.textContent = '';
            cell.style.color = '';
            cell.style.border = '';
        }
        else {
            cell.style.border = '';
        }
    };

    const winnerCells = ([a, b, c]) => {
        cells[a].style.backgroundColor = '#F5CB58';
        cells[b].style.backgroundColor = '#F5CB58';
        cells[c].style.backgroundColor = '#F5CB58';
    }

    const resetCells = () => {
        cells.forEach(c => {
            c.textContent = '';
            c.style.backgroundColor = '';
            c.style.border = '';
            c.style.color = '';
        })
    }

    const closeDialog = () => {
        dialog.close();
        backdrop.style.display = 'none'
        inputName.forEach(input => {
            input.value = '';
        });
    }

    dialog.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeDialog()
        }
    })

    closeBtn.addEventListener('click', closeDialog);


    radioContainer.forEach(option => {
        option.addEventListener('click', e => {
            if (e.target.id === 'p1markerX') {
                document.querySelector('#p2markerO').checked = true;
            }
            else if (e.target.id === 'p1markerO') {
                document.querySelector('#p2markerX').checked = true;
            }
            else if (e.target.id === 'p2markerX') {
                document.querySelector('#p1markerO').checked = true;
            }
            else if (e.target.id === 'p2markerO') {
                document.querySelector('#p1markerX').checked = true;
            }
        })
    })

    submitBtn.addEventListener('click', () => {
        const p1name = document.querySelector('#p1name').value;
        const p2name = document.querySelector('#p2name').value;
        const p1marker = document.querySelector('input[name="p1marker"]:checked').value;
        const p2marker = document.querySelector('input[name="p2marker"]:checked').value;
        const startingPlayer = document.querySelector('input[name="firstToMove"]:checked').value;

        if (startingPlayer === 'player1') {
            player1 = player.createPlayer(p1name, p1marker);
            player2 = player.createPlayer(p2name, p2marker);

        }
        else {
            player2 = player.createPlayer(p2name, p2marker);
            player1 = player.createPlayer(p1name, p1marker);
        }
        functionGame.setStartingPlayer(startingPlayer);
        resetCells();
        closeDialog();
    })

    startBtn.addEventListener('click', () => { functionGame.makeMove() });

    resetBtn.addEventListener('click', () => { functionGame.resetGame() });

    return {
        createPlayerElement, updateScorePlayerElement, updateCurrentPlayerElement, mouseClick, mouseOut, mouseOver, winnerCells, resetCells, getPlayer1, getPlayer2, getCells
    }
})();

const player = (function () {
    const createPlayer = (name, marker) => {
        let score = 0;

        const getScore = () => score;

        const scoreElement = domElements.createPlayerElement(name, marker, score);

        const increaseScore = () => {
            score++;
            domElements.updateScorePlayerElement({ scoreElement, getScore });
        }

        const resetScore = () => {
            score = 0;
            domElements.updateScorePlayerElement({ scoreElement, getScore });
        }

        return {
            scoreElement, name, marker, getScore, increaseScore, resetScore
        }
    }
    return { createPlayer };
})();

const functionGame = (function () {
    const { mouseClick, mouseOver, mouseOut, winnerCells, resetCells, getPlayer1, getPlayer2, getCells, updateCurrentPlayerElement } = domElements;

    const cell = getCells();
    let currentPlayer;
    const getCurrentPlayer = () => currentPlayer;

    const setStartingPlayer = (startingPlayer) => {
        let player1 = getPlayer1();
        let player2 = getPlayer2();
        currentPlayer = startingPlayer === 'player1' ? player1 : player2;
        updateCurrentPlayerElement();

    }
    const switchTurn = () => {
        let player1 = getPlayer1();
        let player2 = getPlayer2();
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
        updateCurrentPlayerElement();
    }

    const handleMouseClick = event => {
        const cell = event.target;
        mouseClick(cell, currentPlayer);
    }

    const handleMouseOver = event => {
        const cell = event.target;
        mouseOver(cell, currentPlayer);
    }

    const handleMouseOut = event => {
        const cell = event.target;
        mouseOut(cell);
    }

    const removeHoverEvents = () => {
        cell.forEach(c => {
            c.removeEventListener('mouseover', handleMouseOver);
            c.removeEventListener('mouseout', handleMouseOut)
        }
        )
    }

    const makeMove = () => {
        cell.forEach(c => {
            c.removeEventListener('click', handleMouseClick);
            c.removeEventListener('mouseover', handleMouseOver);
            c.removeEventListener('mouseout', handleMouseOut);

            c.addEventListener('click', handleMouseClick);
            c.addEventListener('mouseover', handleMouseOver);
            c.addEventListener('mouseout', handleMouseOut);
        });
    };

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
                winnerCells([a, b, c]);
                removeHoverEvents();

                setTimeout(() => {
                    alert(`${currentPlayer.name} wins!`);
                    currentPlayer.increaseScore();
                    resetRound();
                }, 100);
            }
        });

        // Check for tie
        const allFilled = Array.from(cell).every(c => c.textContent);
        if (!winner && allFilled) {
            removeHoverEvents();
            setTimeout(() => {
                alert(`It's a tie!`);
                resetRound();
            }, 50);
        } else if (!winner) {
            switchTurn(); // Only switch turns if there is no tie or winner
        }
    }

    const resetRound = () => {
        switchTurn();
        resetCells()
        makeMove();
    }

    const resetGame = () => {
        let player1 = getPlayer1();
        let player2 = getPlayer2();
        resetCells();
        player1.resetScore();
        player2.resetScore();
        makeMove();
    }

    return { moveChecker, makeMove, resetGame, setStartingPlayer, getCurrentPlayer }
})();
