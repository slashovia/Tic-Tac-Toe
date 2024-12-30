import { playerDisplayManager } from "./playerDisplayManager";
import { createPlayer, currentPlayer } from "./player";
import { gameBoardManager } from "./gameBoardManager";
import { buttonHandler } from "./buttonManager"
import { game } from "./gameLogic";
import { dialogHandler } from "./dialogHandler";

export let player1, player2

export const playerFormHandler = function () {
    const form = document.querySelector('form');

    function clearInputs() {
        const inputFields = form.querySelectorAll('input[type="text"]');
        inputFields.forEach(input => {
            input.value = '';
        })
    }

    function handleFormSubmit() {
        const submitBtn = form.querySelector('#submitBtn');
        submitBtn.addEventListener('click', (event) => {
            if (form.reportValidity()) {
                createPlayersAndStartGame()
            }
            else {
                event.preventDefault();
            }
        }
        )
    }

    function createPlayersAndStartGame() {
        playerDisplayManager.removePlayer();
        const p1name = form.querySelector('#p1name').value;
        const p2name = form.querySelector('#p2name').value;
        const p1marker = form.querySelector('input[name="p1marker"]:checked').value;
        const p2marker = form.querySelector('input[name="p2marker"]:checked').value;
        const startingPlayer = form.querySelector('input[name="firstToMove"]:checked').value;
        let player1Element, player2Element
        player1 = createPlayer(p1name, p1marker);
        player2 = createPlayer(p2name, p2marker);
        player1Element = playerDisplayManager.createPlayer(player1)
        player2Element = playerDisplayManager.createPlayer(player2)
        player1.scoreElement = player1Element;
        player2.scoreElement = player2Element;
        startingPlayer === 'player1' ? currentPlayer.player = player1 : currentPlayer.player = player2
        dialogHandler.close()
        gameBoardManager.resetCells();
        buttonHandler.start(startBtn);
        buttonHandler.end(newGameBtn);
        buttonHandler.enable(startBtn)
        gameBoardManager.removeHoverEvents()
        game.reset()
        game.start();
        playerDisplayManager.updateCurrentPlayer()
    }

    return {
        submit: handleFormSubmit,
        clear: clearInputs
    }
}()