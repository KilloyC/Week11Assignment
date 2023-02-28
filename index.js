                                                        /* TicTacToe Game */

//build the framework in html
    //show when turn is over and which player is up
    //add a removeEventListner to the same element with addEventListner to stop excess clicks.
    //reset button
    //game board

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
const spaces = ['', '', '', '', '', '', '', '', ''];
//console.log(spaces);

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

//sets up the whole game to be played.
function startGame() {
    for(let cell of cells){
        cell.classList.remove('x', 'o'); //used to remove a token from the DOMTokenList which is accessed with the classList property
        cell.addEventListener('click', clickedCell, { once: true }); //passing in an option into the addEventListener so that you can only click the cell once.
        //console.log('click');
        currentPlayer = currentPlayer == 'x' ? 'x' : 'o'; //using ternary operator to assign players to either "x" or "o".
        text.textContent = `It's ${currentPlayer}'s turn`;
        gameBoard.classList.add('turn-' + currentPlayer); //used to add a token to the DOMTokenList which is accessed using the classList property.

        newGame.addEventListener("click", restartGame);   
        console.log(cell);
    }
}

//switches players after a cell has been clicked.
function clickedCell() {
    console.log(currentPlayer);
    this.classList.add(currentPlayer);
    // cells.forEach((cell) => {
    //     cell.classList.add(currentPlayer);
    // })
    console.log(currentPlayer);

    currentPlayer = currentPlayer == 'x' ? 'o' : 'x'; //ternary operator that can used instead of if..if/else. Checking if currentPlayer is equal to X, else O, else X. if the currentPlayer is X it will switch to O and vise versa.
    text.textContent = `Its ${currentPlayer}'s turn`; //textContent is similar to innerText but grabs the content of the whole element and is a little more efficient.
    
    //removes and adds current symbol so that the next players symbol will show up.
    gameBoard.classList.remove('turn-x', 'turn-o');
    gameBoard.classList.add('turn-' + currentPlayer);

    checkWinner();
}

//method to check if a player got a winning combination
    //or did it end in a tie
    //declares a winner or ends in tie

//iterates through the different winning combonations to determine if any combos have been met and then either returns a winner or shows the game as a draw.
function checkWinner(){
    let playerWon = false;

    //iterating over the inner array of winningCombos.
    for(let i = 0; i < winningCombos.length; i++){
        const condition = winningCombos[i];
        console.log()
        //each row has three indices, and checks within "spaces" array at each corresponding indices and if they dont contain empty spaces and all contain the same character that means someone won.
        //or it goes to the next set of indices and checks those. if there are no empty spaces and the charaters dont match its a draw.
        const cellA = spaces[condition[0]];
        const cellB = spaces[condition[1]];
        const cellC = spaces[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            playerWon = true;
            break; //breaks out of the for loop.
        }
    }

    if(playerWon){
        text.textContent = `${currentPlayer} is the winner!`;
        return;
    }
    else if(!spaces.includes("")){
        text.textContent = `Its a Draw! Start a New Game!`;
        return;
    }
    else{
        clickedCell();
    }
}

function restartGame() {
    gameBoard.classList.remove('turn-x', 'turn-o'); //removing this so when we restart it can check if anything is on the board then removes them.
}