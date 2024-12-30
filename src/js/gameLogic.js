import { currentPlayer } from "./player";
import { buttonHandler } from "./buttonManager";
import { gameBoardManager } from "./gameBoardManager";
import { player1, player2 } from "./playerFormHandler";
import { playerDisplayManager } from "./playerDisplayManager";

export const game = function () {
    function switchTurn() {
        currentPlayer.player = (currentPlayer.player === player1) ? player2 : player1;
        playerDisplayManager.updateCurrentPlayer()
    }
    function resetRound() {
        switchTurn();
        gameBoardManager.resetCells();
        currentPlayer.player.move();
    }

    function showMessageAndReset(message) {
        gameBoardManager.removeHoverEvents();
        setTimeout(() => {
            alert(message);
            resetRound();
        }, 400);
    }

    function handleWinner([a, b, c]) {
        gameBoardManager.winnerCells([a, b, c]);
        showMessageAndReset(`${currentPlayer.player.name} wins!`)
        currentPlayer.player.increaseScore();
        playerDisplayManager.updateScorePlayer(currentPlayer.player)
    }

    function checkForTie() {
        const cells = gameBoardManager.getCells()
        const allFilled = Array.from(cells).every(c => c.textContent);
        if (allFilled) {
            showMessageAndReset(`It's a tie!`)
            return true
        }
        return false
    }

    function resetGame() {
        gameBoardManager.resetCells();
        player1.resetScore();
        player2.resetScore();
        playerDisplayManager.updateScorePlayer(player1)
        playerDisplayManager.updateScorePlayer(player2)
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
            const cells = gameBoardManager.getCells()

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