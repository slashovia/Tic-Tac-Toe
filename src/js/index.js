import '../css/style.css'

const domElements = (function () {
    const dialog = document.querySelector('dialog');
    const backdrop = document.querySelector('.backdrop')
    const inputName = document.querySelectorAll('dialog input[type="text"]');
    const radioContainer = document.querySelectorAll('.radio-container');
    const submitBtn = document.querySelector('#submitBtn');
    const closeBtn = document.querySelector('#closeBtn');
    const cells = document.querySelectorAll('.cell');
    const infoPlayer = document.querySelector('.info');
    const livePlayer = document.querySelector('.current-player');
    const tHead = document.querySelector('thead tr');
    const tBody = document.querySelector('tbody tr');
    const startBtn = document.querySelector('#startBtn');
    const resetBtn = document.querySelector('#resetBtn');
    const newGameBtn = document.querySelector('#newGameBtn');
    let player1, player2;

    const getCells = () => cells;

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

    const removePlayerElement = () => {
        document.querySelectorAll('thead th').forEach(th => th.remove());
        document.querySelectorAll('tbody td').forEach(td => td.remove());
        document.querySelectorAll('.info p:not(.current-player)').forEach(p => p.remove());
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
        cell.style.transform = 'scale(1.05)';
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
        cell.style.transform = '';
        cell.style.border = '';
        if (cell.style.color === 'rgba(0, 0, 0, 0.3)') {
            cell.textContent = '';
            cell.style.color = '';
        }
    };

    const winnerCells = ([a, b, c]) => {
        [a, b, c].forEach(i => {
            cells[i].style.transform = '';
            cells[i].style.backgroundColor = '#F5CB58';

        })
    }

    const resetCells = () => {
        cells.forEach(c => {
            c.textContent = '';
            c.style.backgroundColor = '';
            c.style.border = '';
            c.style.color = '';
        })
    }

    const openDialog = () => {
        dialog.showModal();
        backdrop.style.display = 'block';
    }

    const closeDialog = () => {
        dialog.close();
        backdrop.style.display = 'none';
        inputName.forEach(input => {
            input.value = '';
        });
    }
    const endAnimation = btn => {
        btn.style.animationDuration = "0s";
    }
    const startAnimation = btn => {
        btn.style.animationDuration = "1s";
    }

    const enableButtons = () => {
        startBtn.disabled = false;
        resetBtn.disabled = false;
    }
    dialog.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeDialog()
        }
    })

    radioContainer.forEach(option => {
        option.addEventListener('click', e => {
            const p1markerX = document.querySelector('#p1markerX');
            const p1markerO = document.querySelector('#p1markerO');
            const p2markerX = document.querySelector('#p2markerX');
            const p2markerO = document.querySelector('#p2markerO');

            if (e.target.name === 'p1marker') {
                if (e.target.value === 'X') {
                    p2markerO.checked = true;
                } else {
                    p2markerX.checked = true;
                }
            }

            if (e.target.name === 'p2marker') {
                if (e.target.value === 'X') {
                    p1markerO.checked = true;
                } else {
                    p1markerX.checked = true;
                }
            }
        });
    });


    submitBtn.addEventListener('click', () => {
        const p1name = document.querySelector('#p1name').value;
        const p2name = document.querySelector('#p2name').value;
        const p1marker = document.querySelector('input[name="p1marker"]:checked').value;
        const p2marker = document.querySelector('input[name="p2marker"]:checked').value;
        const startingPlayer = document.querySelector('input[name="firstToMove"]:checked').value;

        if (p1name.trim().length === 0 || p2name.trim().length === 0) {
            alert("Please fill out the required fields.")
        }
        else {

            removePlayerElement();

            if (startingPlayer === 'player1') {
                player1 = player.createPlayer(p1name, p1marker);
                player2 = player.createPlayer(p2name, p2marker);

            }
            else {
                player2 = player.createPlayer(p2name, p2marker);
                player1 = player.createPlayer(p1name, p1marker);
            }
            functionGame.initializePlayer(player1, player2);
            functionGame.setStartingPlayer(startingPlayer);
            resetCells();
            closeDialog();
            startAnimation(startBtn);
            endAnimation(newGameBtn);
            enableButtons();
        }
    })

    startBtn.addEventListener('click', () => {
        functionGame.makeMove();
        endAnimation(startBtn)
    });

    resetBtn.addEventListener('click', () => functionGame.resetGame());

    newGameBtn.addEventListener('click', openDialog);

    closeBtn.addEventListener('click', closeDialog);

    startAnimation(newGameBtn);
    return {
        createPlayerElement, updateScorePlayerElement, updateCurrentPlayerElement, mouseClick, mouseOut, mouseOver, winnerCells, resetCells, getCells
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
    const { mouseClick, mouseOver, mouseOut, winnerCells, resetCells, getCells, updateCurrentPlayerElement } = domElements;

    let currentPlayer, player1, player2;
    const cell = getCells();
    const getCurrentPlayer = () => currentPlayer;
    const initializePlayer = (p1, p2) => {
        player1 = p1;
        player2 = p2;
    }

    const setStartingPlayer = (startingPlayer) => {
        currentPlayer = startingPlayer === 'player1' ? player1 : player2;
        updateCurrentPlayerElement();

    }
    const switchTurn = () => {
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
        updateCurrentPlayerElement();
    }

    const cellEvents = {
        'click': (event) => {
            mouseClick(event.target, currentPlayer);
        },
        'mouseover': (event) => {
            mouseOver(event.target, currentPlayer)
        },
        'mouseout': (event) => {
            mouseOut(event.target)
        }
    }

    const handlerCellEvents = event => {
        if (cellEvents[event.type]) {
            cellEvents[event.type](event)
        }
    }

    const removeHoverEvents = () => {
        cell.forEach(c => {
            c.removeEventListener('mouseover', handlerCellEvents);
            c.removeEventListener('mouseout', handlerCellEvents)
        }
        )
    }

    const makeMove = () => {
        cell.forEach(c => {
            c.removeEventListener('click', handlerCellEvents);
            c.removeEventListener('mouseover', handlerCellEvents);
            c.removeEventListener('mouseout', handlerCellEvents);

            c.addEventListener('click', handlerCellEvents);
            c.addEventListener('mouseover', handlerCellEvents);
            c.addEventListener('mouseout', handlerCellEvents);
        });
    };

    const moveChecker = () => {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        let winner = false;

        winConditions.some(([a, b, c]) => {
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
                }, 400);
                return true;
            }
            return false;
        });

        // Check for tie
        const allFilled = Array.from(cell).every(c => c.textContent);
        if (!winner && allFilled) {
            removeHoverEvents();
            setTimeout(() => {
                alert(`It's a tie!`);
                resetRound();
            }, 400);
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
        resetCells();
        player1.resetScore();
        player2.resetScore();
        makeMove();
    }

    return { moveChecker, makeMove, resetGame, setStartingPlayer, getCurrentPlayer, initializePlayer }
})();
