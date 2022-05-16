// Player factory function
const createPlayer = (player, marker) => {
    return { player, marker };
};

const player1 = createPlayer("Player 1", "x")
const player2 = createPlayer("Player 2", "circle");
let xTurn = true;

// Game board logic module
const gameLogic = (() => {

    const allCells = document.querySelectorAll("[data-cell]");

    // Create variables for players consisting of names and markers, and the current active marker (X or O)

    const winnerMessage = document.querySelector(".winner-message");
    const winningBoards = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    // check for any possible win conditions
    function checkWin(currentClass) {
        return winningBoards.some(item => {
            return item.every(index => {
                return allCells[index].classList.contains(currentClass)
            })
        })
    }

    // check if all cells are populated with no win conditions met
    function checkDraw() {
        return [...allCells].every(cell => {
            return cell.classList.contains(player1.marker) || cell.classList.contains(player2.marker)
        })
    }

    // End game with draw or no draw
    function endGame(draw) {
        document.querySelector(".winner-screen").style.display = "flex";
        if (draw) {
            winnerMessage.textContent = "It's a tie.";
        } else if (xTurn) {
            winnerMessage.textContent = "Player 1 Wins!";
        } else {
            winnerMessage.textContent = "Player 2 Wins!";
        }
    }

    return {
        checkWin,
        checkDraw,
        endGame
    };
})();

// Browser game board display module
const boardDisplay = (() => {

    const allCells = document.querySelectorAll("[data-cell]");
    let boardHover = document.querySelector(".board");

    allCells.forEach(cell => {
        cell.addEventListener("click", logClick);
    });

    function initializeGame() {
        allCells.forEach(cell => {
            cell.classList.remove(player1.marker);
            cell.classList.remove(player2.marker);
        });
        boardHover.classList.remove(player1.marker);
        boardHover.classList.remove(player2.marker);
        boardHover.classList.add(player1.marker);
        xTurn = true;
    
        document.querySelector(".winner-screen").style.display = "none";
    }

    // Target cell that was clicked, place a marker at target cell according to what
    // current active marker is (default is X), change the player, and the alternate
    // the hover effect for the game board
    function logClick(e) {
        if (e.target.classList.contains("x") || e.target.classList.contains("circle")) {
        return;
        }
        const cell = e.target;
        const currentClass = xTurn ? player1.marker : player2.marker;
        placeMarker(cell, currentClass);
        if (gameLogic.checkWin(currentClass)) {
        gameLogic.endGame(false)
        } else if (gameLogic.checkDraw()) {
        gameLogic.endGame(true)
        } else {
            changePlayer();
            changeHover();
     }
    }

    // Place X or O at target cell
    function placeMarker(cell, currentClass) {
        cell.classList.add(currentClass);
    }

    // Alternate active marker after each click
    function changePlayer() {
        xTurn = !xTurn;
    }

    // Alternate board hover display after each click
    function changeHover() {
        boardHover.classList.remove(player1.marker);
        boardHover.classList.remove(player2.marker);
        if (xTurn) {
            boardHover.classList.add(player1.marker);
        } else {
            boardHover.classList.add(player2.marker);
        }
    }

    return {
        initializeGame,
        logClick,
        placeMarker,
        changePlayer,
        changeHover
    };
})();

window.onload = boardDisplay.initializeGame;