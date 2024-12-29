// DOM Elements

export let player1, player2, cells
export const startBtn = document.querySelector('#startBtn');
export const resetBtn = document.querySelector('#resetBtn');
import { game } from "./gameLogic";
import { createPlayer, currentPlayer } from "./player";

export const domManager = function () {
    //Cell handler
    const cellEvents = {
        'click': (event) => {
            mouse.click(event.target, currentPlayer.player);
        },
        'mouseover': (event) => {
            mouse.over(event.target, currentPlayer.player)
        },
        'mouseout': (event) => {
            mouse.out(event.target)
        }

    }

    function handlerCellEvents(event) {
        if (cellEvents[event.type]) {
            cellEvents[event.type](event)
        }
    }

    return {
        createBoard: function () {
            const gameBoard = document.querySelector('.gameboard')
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                gameBoard.appendChild(cell);
                const input = document.createElement('input');
                input.type = 'button';
                cell.appendChild(input);
            }
            cells = gameBoard.querySelectorAll('.cell')
        },
        updateCurrentPlayer: function () {
            let currentPlayerData = currentPlayer.player;
            const livePlayer = document.querySelector('.current-player');

            livePlayer.textContent = `Current Player: `;

            const currentPlayerInfo = document.createElement('span');
            currentPlayerInfo.textContent = `${currentPlayerData.name} - ${currentPlayerData.marker}`;
            livePlayer.appendChild(currentPlayerInfo);
        },
        updateScorePlayer: function (player) {
            player.scoreElement.textContent = player.score
        },
        createPlayer: function (player) {
            const tHead = document.querySelector('thead tr');
            const tBody = document.querySelector('tbody tr');
            const infoPlayer = document.querySelector('.info');

            const th = document.createElement('th');
            th.textContent = player.name;
            tHead.appendChild(th);

            const td = document.createElement('td');
            td.textContent = player.score;
            tBody.appendChild(td);

            const infoName = document.createElement('p');
            infoName.textContent = `${player.name}'s marker: `;
            infoPlayer.appendChild(infoName);

            const infoMarker = document.createElement('span');
            infoMarker.textContent = player.marker;
            infoName.appendChild(infoMarker);

            return td;
        },
        removePlayer: function () {
            document.querySelectorAll('thead th').forEach(th => th.remove());
            document.querySelectorAll('tbody td').forEach(td => td.remove());
            document.querySelectorAll('.info p:not(.current-player)').forEach(p => p.remove());
        },
        winnerCells: function ([a, b, c]) {
            [a, b, c].forEach(i => {
                cells[i].style.transform = '';
                cells[i].style.backgroundColor = '#F5CB58';
            })
        },
        resetCells: function () {
            cells.forEach(c => {
                c.textContent = '';
                c.style.backgroundColor = '';
                c.style.border = '';
                c.style.color = '';
            })
        },
        cellEvents: function (event) {
            if (cellEvents[event.type]) {
                cellEvents[event.type](event)
            }
        },

        removeHoverEvents: function () {
            cells.forEach(c => {
                c.removeEventListener('mouseover', handlerCellEvents);
                c.removeEventListener('mouseout', handlerCellEvents)
            }
            )
        },
        handlerCellEvents
    }
}()



// MouseHandler
const mouse = function () {
    return {
        click: function (cell, player) {
            if (cell.style.border === '5px solid limegreen') {
                cell.textContent = player.marker;
                cell.style.color = 'black';
                cell.style.border = '';
                game.checkMove();
            } else {
                alert('Warning, move not allowed. Try again.');
            }
        },
        over: function (cell, player) {
            cell.style.transform = 'scale(1.05)';
            if (cell.textContent === '') {
                cell.style.border = '5px solid limegreen';
                cell.textContent = player.marker;
                cell.style.color = 'rgba(0, 0, 0, 0.3)';
            }
            else {
                cell.style.border = '5px solid tomato';
            }
        },
        out: function (cell) {
            cell.style.transform = '';
            cell.style.border = '';
            if (cell.style.color === 'rgba(0, 0, 0, 0.3)') {
                cell.textContent = '';
                cell.style.color = '';
            }
        }
    }
}();


// DialogHandler
export const dialogHandler = function () {
    const dialog = document.querySelector('dialog');
    const backdrop = document.querySelector('.backdrop')
    const newGameBtn = document.querySelector('#newGameBtn');
    const form = document.querySelector('form');
    function handleKeyDown(e) {
        if (e.key === 'Escape') {
            closeDialog()
        }
    }

    function openDialog() {
        dialog.showModal();
        backdrop.style.display = 'block';
        dialog.addEventListener('keydown', handleKeyDown)
        switchPlayerMarkers();
    }

    function closeDialog() {
        dialog.close();
        backdrop.style.display = 'none';
        clearInputs()
    }

    function clearInputs() {
        const inputFields = form.querySelectorAll('input[type="text"]');
        inputFields.forEach(input => {
            input.value = '';
        })
    }

    function switchPlayerMarkers() {
        const markers = form.querySelectorAll('input[name="p1marker"], input[name="p2marker"]')
        const p1markerX = form.querySelector('#p1markerX')
        const p1markerO = form.querySelector('#p1markerO')
        const p2markerX = form.querySelector('#p2markerX')
        const p2markerO = form.querySelector('#p2markerO')

        for (const option of markers) {
            option.addEventListener('click', e => {
                if (e.target.id === 'p1markerX' || e.target.id === 'p2markerO') {
                    p1markerX.checked = true;
                    p2markerO.checked = true
                }
                else {
                    p1markerO.checked = true;
                    p2markerX.checked = true;
                }
            })
        }
    }
    return {
        open: function () {
            newGameBtn.removeEventListener('click', openDialog)
            newGameBtn.addEventListener('click', openDialog);
        },
        close: function () {
            const closeBtn = form.querySelector('#closeBtn');
            closeBtn.addEventListener('click', closeDialog)
        },

        submit: function () {
            const submitBtn = form.querySelector('#submitBtn');
            submitBtn.addEventListener('click', (event) => {
                if (form.reportValidity()) {
                    domManager.removePlayer();
                    const p1name = form.querySelector('#p1name').value;
                    const p2name = form.querySelector('#p2name').value;
                    const p1marker = form.querySelector('input[name="p1marker"]:checked').value;
                    const p2marker = form.querySelector('input[name="p2marker"]:checked').value;
                    const startingPlayer = form.querySelector('input[name="firstToMove"]:checked').value;
                    player1 = createPlayer(p1name, p1marker);
                    player2 = createPlayer(p2name, p2marker);

                    let player1Element, player2Element

                    if (startingPlayer === 'player1') {
                        player1Element = domManager.createPlayer(player1)
                        player2Element = domManager.createPlayer(player2)
                        currentPlayer.player = player1
                    }
                    else {
                        player2Element = domManager.createPlayer(player2)
                        player1Element = domManager.createPlayer(player1)
                        currentPlayer.player = player2
                    }
                    player1.scoreElement = player1Element;
                    player2.scoreElement = player2Element;

                    domManager.resetCells();
                    closeDialog();
                    buttonHandler.start(startBtn);
                    buttonHandler.end(newGameBtn);
                    buttonHandler.enable(startBtn)
                    domManager.removeHoverEvents()
                    game.start();
                    game.reset()
                    domManager.updateCurrentPlayer()
                }
                else {
                    event.preventDefault();
                }
            }
            )
        }
    }
}();

// ButtonHandler 
export const buttonHandler = function () {
    return {
        end: function (btn) {
            btn.style.animationDuration = "0s";
        },
        start: function (btn) {
            btn.style.animationDuration = "1s";
        },
        disable: function (btn) {
            btn.disabled = true;
        },
        enable: function (btn) {
            btn.disabled = false;
        }
    }
}()
