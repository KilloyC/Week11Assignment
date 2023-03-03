                                                        /* TicTacToe Game */

//HTML DOM element selectors
let text = document.querySelector('#gameText');
//console.log(text);

const gameBoard = document.querySelector('#board1');
//console.log(gameBoard);

const cells = document.querySelectorAll('.cell');
//console.log(cells);

const newGame = document.querySelector('#newGame');
//console.log(newGame);

//game variables.
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
// console.log(winningCombos);

//player 'x' and 'o' are assigned in the startGame function.
let currentPlayer;

startGame();

newGame.addEventListener("click", startGame); //clears the board and starts a new game.

//sets up the whole game to be played.
function startGame() {
    gameBoard.classList.remove('turn-x', 'turn-o'); //removes any x's or o's that is on the board by removing them from the gameBoard classList property.

    for(let cell of cells){
        cell.classList.remove('x', 'o'); //used to remove a token from the DOMTokenList which is accessed with the cells classList property.
        cell.addEventListener('click', clickedCell, { once: true }); //passing in an option into the addEventListener so that you can only click the cell once.
    }

    currentPlayer = currentPlayer == 'x' ? 'x' : 'o'; //using ternary operator to assign players to either "x" or "o".
    text.textContent = `Player- ${currentPlayer.toUpperCase()} -starts`;
    gameBoard.classList.add('turn-' + currentPlayer); //used to add a token to the DOMTokenList which is accessed using the gameBoard classList property.

};

//switches players after a cell has been clicked.
function clickedCell() {
    this.classList.add(currentPlayer);
    //console.log(currentPlayer);

    //declares a winner or ends in a draw
    if(checkWinner()) {
        text.textContent = `Player ${currentPlayer.toUpperCase()} has won!! Play Again?`;

    } else if(draw()) {
        text.textContent = `Cat's Game! Play Again?!!`;
        
   } else {
        currentPlayer = currentPlayer == 'x' ? 'o' : 'x'; //ternary operator that is used instead of if..if/else statements. Checking if currentPlayer is equal to X, else O, else X. if the currentPlayer is X it will switch to O and vise versa.
        text.textContent = `It's Player ${currentPlayer.toUpperCase()}'s turn`; //textContent is similar to innerText but grabs the content of the whole element and is a little more efficient.
    
        //removes and adds current symbol so that the next players symbol will show up.
        gameBoard.classList.remove('turn-x', 'turn-o');
        gameBoard.classList.add('turn-' + currentPlayer);
   }
};

//method to check if a player got a winning combination
    //or did it end in a draw

//iterates through the different winning combonations to determine if any combos have been met and then either returns a winner or shows the game as a draw.
function checkWinner(){
    return winningCombos.some(winningCombo => {
        //console.log(winningCombo); //looping through the winningCombos array and returns each winning combination.
        return winningCombo.every(index => { //tests whether all elements in the array pass the test implemented by the function.
          if(cells[index].classList.contains(currentPlayer)){ //checking to see if cells index contains and X or and O.
            return true;
          }

          return false;
        })
    })
};

function draw() {
    //I had to destructure the array "..." to break it down because cells nodes_list doesn't have a command for .every. turns values in an array into distinct variables.
    return [...cells].every(combos => { 
        if(combos.classList.contains('x') || combos.classList.contains('o')){ //if cells dont have an empty cell the game ends in a draw.
            return true;
        }

        return false;
    })
};