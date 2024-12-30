import '../css/style.css'

import { dialogHandler } from './dialogHandler';
import { gameBoardManager } from './gameBoardManager';

document.addEventListener('DOMContentLoaded', () => {
    dialogHandler.open()
    gameBoardManager.createBoard()
});