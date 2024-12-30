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
    return {
        submit: handleFormSubmit,
        clear: clearInputs
    }
}