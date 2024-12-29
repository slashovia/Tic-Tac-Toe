export const playerDisplayManager = function () {
    return {
        updateCurrentPlayer: function () {
            let currentPlayerData = currentPlayer.player;
            const livePlayer = document.querySelector('.current-player');

            livePlayer.textContent = `Current Player: `;

            const currentPlayerInfo = document.createElement('span');
            currentPlayerInfo.textContent = `${currentPlayerData.name} - ${currentPlayerData.marker}`;
            livePlayer.appendChild(currentPlayerInfo);
        },
        updateScorePlayer: function (player) {
            player.scoreElement.textContent = player.score
        },
        createPlayer: function (player) {
            const tHead = document.querySelector('thead tr');
            const tBody = document.querySelector('tbody tr');
            const infoPlayer = document.querySelector('.info');

            const th = document.createElement('th');
            th.textContent = player.name;
            tHead.appendChild(th);

            const td = document.createElement('td');
            td.textContent = player.score;
            tBody.appendChild(td);

            const infoName = document.createElement('p');
            infoName.textContent = `${player.name}'s marker: `;
            infoPlayer.appendChild(infoName);

            const infoMarker = document.createElement('span');
            infoMarker.textContent = player.marker;
            infoName.appendChild(infoMarker);

            return td;
        },
        removePlayer: function () {
            document.querySelectorAll('thead th').forEach(th => th.remove());
            document.querySelectorAll('tbody td').forEach(td => td.remove());
            document.querySelectorAll('.info p:not(.current-player)').forEach(p => p.remove());
        }
    }
}