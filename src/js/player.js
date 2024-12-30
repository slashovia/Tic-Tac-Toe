import { gameBoardManager } from './gameBoardManager'

export function createPlayer(name, marker) {
    let score = 0;
    const cells = gameBoardManager.getCells();
    return {
        get name() {
            return name
        },
        get marker() {
            return marker
        },
        get score() {
            return score
        },
        increaseScore: function () {
            score++;
        },
        resetScore: function () {
            score = 0;
        },
        move: function () {
            cells.forEach(c => {
                c.removeEventListener('click', gameBoardManager.handlerCellEvents);
                c.removeEventListener('mouseover', gameBoardManager.handlerCellEvents);
                c.removeEventListener('mouseout', gameBoardManager.handlerCellEvents);

                c.addEventListener('click', gameBoardManager.handlerCellEvents);
                c.addEventListener('mouseover', gameBoardManager.handlerCellEvents);
                c.addEventListener('mouseout', gameBoardManager.handlerCellEvents);
            });
        },
        scoreElement: null,
    };
}

export const currentPlayer = function () {
    let currentPlayer;
    return {
        get player() {
            return currentPlayer
        },
        set player(player) {
            currentPlayer = player
        }
    }
}