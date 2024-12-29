export const mouse = function () {
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
};