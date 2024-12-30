export const dialogHandler = function () {
    const dialog = document.querySelector('dialog');
    const backdrop = document.querySelector('.backdrop')

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
    return {
        open: function () {
            const newGameBtn = document.querySelector('#newGameBtn');
            newGameBtn.removeEventListener('click', openDialog)
            newGameBtn.addEventListener('click', openDialog);
        },
        close: function () {
            const closeBtn = form.querySelector('#closeBtn');
            closeBtn.addEventListener('click', closeDialog)
        }
    }
}