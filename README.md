# The Odin Project's Project: Tic-Tac-Toe

Create Tic-Tac-Toe game. [Project's Link](https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe)

## Structure

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

Nothing to say here, it just contains a bunch of base formatting rules to ensure consistent styling across the project.

### Main CSS File

Within the :root pseudo-class, three custom properties are defined.

The layout is organized into four main areas (player info, gameboard, scoreboard, button-wrapper), created with CSS Grid using grid-template-columns and grid-template areas.

The gameboard itself uses CSS Grid. The cell class applied to each div  represents the players marker and their  container. In fact,the cells may change their aspect based on players' moves. This will be menage by JavaScript. 

The "Start Button" and "New game button" have animation properties including a custom key frame for a better user experience.

### Javascript File

Most functionality resides here, organized into three main IIFEs:

1. Declares variables and includes all functions that modify DOM elements, such as:
 - Updating player info;
 - Opening and closing the dialog;
 - Starting/Stopping animations;
 - Cell actions (reset, click, over, out);
 - Adding addEventListener for buttons.

2. Menages player creation, including names, markers and scores.

3. Handles the Tic-Tac-Toe game logic, including:
 - Switching turn;
 - Checking moves;
 - Resetting rounds and game.

