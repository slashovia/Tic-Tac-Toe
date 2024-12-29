import { cells, domManager } from "./domManager";

export function createPlayer(name, marker) {
    let score = 0;

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
                c.removeEventListener('click', domManager.handlerCellEvents);
                c.removeEventListener('mouseover', domManager.handlerCellEvents);
                c.removeEventListener('mouseout', domManager.handlerCellEvents);

                c.addEventListener('click', domManager.handlerCellEvents);
                c.addEventListener('mouseover', domManager.handlerCellEvents);
                c.addEventListener('mouseout', domManager.handlerCellEvents);
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