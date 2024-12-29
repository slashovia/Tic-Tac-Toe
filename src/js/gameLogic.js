import { player1, player2, startBtn, resetBtn, cells, domManager, buttonHandler } from "./domManager";

import { currentPlayer } from "./player";

export const game = function () {
    function switchTurn() {
        currentPlayer.player = (currentPlayer.player === player1) ? player2 : player1;
        domManager.updateCurrentPlayer()
    }
    function resetRound() {
        switchTurn();
        domManager.resetCells();
        currentPlayer.player.move();
    }

    function showMessageAndReset(message) {
        domManager.removeHoverEvents();
        setTimeout(() => {
            alert(message);
            resetRound();
        }, 400);
    }

    function handleWinner([a, b, c]) {
        domManager.winnerCells([a, b, c]);
        showMessageAndReset(`${currentPlayer.player.name} wins!`)
        currentPlayer.player.increaseScore();
        domManager.updateScorePlayer(currentPlayer.player)
    }

    function checkForTie() {
        const allFilled = Array.from(cells).every(c => c.textContent);
        if (allFilled) {
            showMessageAndReset(`It's a tie!`)
            return true
        }
        return false
    }

    function resetGame() {
        domManager.resetCells();
        player1.resetScore();
        player2.resetScore();
        domManager.updateScorePlayer(player1)
        domManager.updateScorePlayer(player2)
        currentPlayer.player.move();
    }

    function startGame() {
        currentPlayer.player.move();
        buttonHandler.end(startBtn)
        buttonHandler.disable(startBtn)
        buttonHandler.enable(resetBtn)
    }
    return {
        checkMove: function () {
            const winConditions = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                [0, 4, 8], [2, 4, 6] // Diagonals
            ];
            //Check for winner
            let winner = winConditions.some(([a, b, c]) => {
                if (cells[a].textContent &&
                    cells[a].textContent === cells[b].textContent &&
                    cells[a].textContent === cells[c].textContent) {
                    handleWinner([a, b, c])
                    return true;
                }
                return false;
            });

            // Check for tie
            if (!winner) {
                if (!checkForTie()) {
                    switchTurn(); // Only switch turns if there is no tie or winner
                }
            }
        },
        reset: function () {
            resetBtn.addEventListener('click', resetGame);
        },
        start: function () {
            startBtn.addEventListener('click', startGame);
        }
    }
}()