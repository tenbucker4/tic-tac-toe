// Player factory function
const createPlayer = (player, marker) => {
    return { player, marker };
};

// Create variables for players consisting of names and markers, and the current active marker (X or O)
const player1 = createPlayer("Player 1", "x")
const player2 = createPlayer("Player 2", "circle");
let activeMarker = player1.marker;
let activeHoverState = "x";
const gameEndScreen = document.querySelector(".winner-screen");
const winnerMessage = document.querySelector(".winner-message");
const playAgainButton = document.querySelector(".play-again");

// Adds class to the gameboard to display X or O in hover, alternating with each click
let boardHover = document.querySelector(".board");
boardHover.classList.add(activeHoverState);

// Game board logic module
const gameLogic = (() => {
    let board = [];

    return {

    };
})();

// Browser game board display module
const boardDisplay = (() => {


    return {

    };
})

// Listen for a single click on each cell
const gameCells = document.querySelectorAll(".cell");
gameCells.forEach(cell => {
    cell.addEventListener("click", logClick, { once: true });
});

// Target cell that was clicked, place a marker at target cell according to what
// current active marker is (default is X), change the player, and the alternate
// the hover effect for the game board
function logClick(e) {
    const cell = e.target;
    console.log("click occurred");
    placeMarker(cell, activeMarker, boardHover);

    if (activeMarker == player1.marker) {
        xMoves.push(e.target.id);
        xMoves.sort();
        board.push(xMoves);
    } else {
        circleMoves.push(e.target.id);
        circleMoves.sort();
        board.push(circleMoves);
    }

    checkWinner();
    changePlayer();
    toggleBoardHoverState();
}

function placeMarker(cell, activeMarker) {
    cell.classList.add(activeMarker);
}

// Alternate active marker after each click
function changePlayer() {
    if (activeMarker == player1.marker) {
        activeMarker = player2.marker;
    } else if (activeMarker == player2.marker) {
        activeMarker = player1.marker;
    }
}

// Alternate board hover display after each click
function toggleBoardHoverState() {
    boardHover.classList.remove(activeHoverState);

    if (activeHoverState === "x") {
        activeHoverState = "circle";
        boardHover.classList.add(activeHoverState);
    } else {
        activeHoverState = "x";
        boardHover.classList.add(activeHoverState);
    }
}

// Define current board state and possible winning board states
let board = [];
const winningBoards = [
    "012",
    "345",
    "678",
    "036",
    "147",
    "258",
    "048",
    "246"
];

let xMoves = [];
let circleMoves = [];

// Check if any of the entries within winningBoards matches any entries in the current game board.
// If so, declare a winner
function checkWinner() {
    let boardStrings = [];
    for (let i = 0; i < board.length; i++) {
        let str = board[i].join("");
        boardStrings.push(str);
    }
    console.log(boardStrings);
    console.log(winningBoards);
    for (let i = 0; i < boardStrings.length; i++) {
        for (let j = 0;  j < winningBoards.length; j++) {
            if (boardStrings[i] === winningBoards[j]) {
                document.querySelector(".winner-screen").style.display = "flex";
                if (activeMarker == player1.marker) {
                    winnerMessage.textContent = "Player 1 Wins!"
                } else {
                    winnerMessage.textContent = "Player 2 Wins!"
                }
            }
        }
    }
}