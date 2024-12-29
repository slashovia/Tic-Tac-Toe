export const gameBoardManager = function () {
    let cellEvents = {
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
        handlerCellEvents: function (event) {
            if (cellEvents[event.type]) {
                cellEvents[event.type](event)
            }
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
    }

}