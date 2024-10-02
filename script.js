const domElements = (function () {
    const dialog = document.querySelector('dialog');
    const backdrop = document.querySelector('.backdrop')
    const formInput = document.querySelectorAll('.formInput');
    const p1name = document.querySelector('#p1name');
    const p2name = document.querySelector('#p2name');
    const radioContainer = document.querySelectorAll('.radio-container');
    const submitBtn = document.querySelector('#submitBtn');
    const closeBtn = document.querySelector('#closeBtn');
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

    const mouseClick = (cell, player) => {
        const { moveChecker } = functionGame;
        if (cell.style.border === '5px solid limegreen') {
            cell.textContent = player.marker;
            cell.style.color = 'black';
            cell.style.border = '';
            moveChecker();
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
        cell[a].style.backgroundColor = '#F5CB58';
        cell[b].style.backgroundColor = '#F5CB58';
        cell[c].style.backgroundColor = '#F5CB58';
    }

    const resetCells = () => {
        cell.forEach(c => {
            c.textContent = '';
            c.style.backgroundColor = '';
            c.style.border = '';
            c.style.color = '';
        })
    }

    const closeDialog = () => {
        dialog.close();
        backdrop.style.display = 'none'
        formInput.forEach(input => {
            input.value = '';
        });
    }

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
            else {
                document.querySelector('#p1markerX').checked = true;
            }
        })
    })

    dialog.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeDialog()
        }
    })

    closeBtn.addEventListener('click', closeDialog);

    submitBtn.addEventListener('click', () => {
        const { createPlayer } = player
        createPlayer(p1name.value, p1marker.value);
        createPlayer(p2name.value, p2marker.value);
        closeDialog();
    })
    return {
        cell, infoPlayer, startBtn, resetBtn, createPlayerElement, updateCurrentPlayerElement, updateScorePlayerElement, mouseClick, mouseOut, mouseOver, winnerCells, resetCells,
    }
})();

const player = (function () {
    const { createPlayerElement } = domElements;

    const createPlayer = (name, marker) => {
        let score = 0;
        const scoreElement = createPlayerElement(name, marker, score);

        return {
            name, marker, scoreElement, score, createPlayer
        }
    }

    return { createPlayer };
})();

const functionGame = (function () {
    const { cell, startBtn, resetBtn, updateCurrentPlayerElement, updateScorePlayerElement, mouseClick, mouseOver, mouseOut, winnerCells, resetCells } = domElements;
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
        resetCells();
    }

    const resetRound = () => {
        switchTurnRound();
        resetCells()
        makeMove();
    }

    const resetGame = () => {
        currentPlayerRound = player1;
        currentPlayer = player1;
        updateCurrentPlayerElement(currentPlayer);
        resetCells();
        resetScore(player1);
        resetScore(player2);
        makeMove();
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
                    increaseScore(currentPlayer);
                    resetRound();
                }, 50);
            }
        });

        // Check for tie
        if (!winner) {
            const allFilled = Array.from(cell).every(c => c.textContent);
            if (allFilled) {
                removeHoverEvents();
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

    return { moveChecker }
})();
