import '../css/style.css'

import { dialogHandler } from './dialogHandler';
import { gameBoardManager } from './gameBoardManager';
import { playerFormHandler } from './playerFormHandler';

document.addEventListener('DOMContentLoaded', () => {
    dialogHandler.open();
    dialogHandler.close();
    playerFormHandler.submit();
});

gameBoardManager.createBoard()