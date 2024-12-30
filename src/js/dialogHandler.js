import { markHandler } from './markerHandler'
import { playerFormHandler } from './playerFormHandler';

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
        markHandler.switchMarkers();
        playerFormHandler.submit()
    }

    function closeDialog() {
        dialog.close();
        backdrop.style.display = 'none';
        playerFormHandler.clear()
    }


    closeBtn.addEventListener('click', closeDialog)

    return {
        open: function () {
            const newGameBtn = document.querySelector('#newGameBtn');
            newGameBtn.removeEventListener('click', openDialog)
            newGameBtn.addEventListener('click', openDialog);
        },
        close: closeDialog
    }
}()