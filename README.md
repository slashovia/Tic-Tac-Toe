# The Odin Project's Project: Tic-Tac-Toe

The project involves creating a Tic-Tac-Toe game. [Link to the project description](https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe)

## Structure

The project has been set up using npm and Webpack.

### HTML File

The body includes:

1. A dialog where the user can enter player information;

2. A div with the class "backdrop" that applies a blur effect to the main page when the dialog is open;

3. A Main tag that holds:
   - An "info" div displaying player names;
   - A div with nine child div element, each containing a button input fo the gameboard cells;
   - A table for the scoreboard;
   - A section for main buttons such as "New Game", "Restart" etc...

### Reset CSS File

This file contains base formatting rules to ensure consistent styling across different browsers.

### Main CSS File

Within the :root pseudo-class, three custom properties are defined.

The layout is organized into four main areas (player info, gameboard, scoreboard, button-wrapper), created with CSS Grid using grid-template-columns and grid-template areas.

The gameboard itself uses CSS Grid. The cell class applied to each div  represents the players marker and their  container. In fact,the cells may change their aspect based on players' moves. This will be menage by JavaScript. 

The "Start Button" and "New game button" have animation properties including a custom key frame for a better user experience.

### Javascript File

Most functionality resides here, organized into four files:

1. Index: imports the main functions and CSS file.

2. Player: this module contains factory functions for creating players and managing the currentPlayer.

3. DomManager: includes main IIFEs for handling elements dom's, such as:
- Creating the gameboard; 
- Handling the dialog;
 - Adding button animations and controls.

4. GameLogic: manages the core game logic, including:
 - Switching turn;
 - Checking moves;
 - Resetting rounds and game.

