import '../css/style.css'

import { dialogHandler, domManager } from './domManager'

document.addEventListener('DOMContentLoaded', () => {
    dialogHandler.open();
    dialogHandler.close();
    dialogHandler.submit();
});

domManager.createBoard()