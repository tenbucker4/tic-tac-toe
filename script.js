// Player factory function
const createPlayer = (player, marker) => {
    return {player, marker};
};


const player1 = createPlayer("Player 1", "x")
const player2 = createPlayer("Player 2", "circle");
let activeMarker = player1.marker;
let activeHoverState = "x";
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


const gameCells = document.querySelectorAll(".cell");
gameCells.forEach(cell => {
    cell.addEventListener("click", logClick, { once: true });
});


function logClick (e) {
    const cell = e.target;
    console.log("click occurred");
    placeMarker(cell, activeMarker, boardHover);
    changePlayer();
    toggleBoardHoverState();
}

function placeMarker (cell, activeMarker) {
    cell.classList.add(activeMarker);
}

function changePlayer() {
    if (activeMarker == player1.marker) {
        activeMarker = player2.marker;
    } else if (activeMarker == player2.marker) {
        activeMarker = player1.marker;
    }
}

function toggleBoardHoverState () {
    boardHover.classList.remove(activeHoverState);
    
    if (activeHoverState === "x") {
        activeHoverState = "circle";
        boardHover.classList.add(activeHoverState);
    } else {
        activeHoverState = "x";
        boardHover.classList.add(activeHoverState);
    }
}