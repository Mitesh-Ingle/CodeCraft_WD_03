let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameMode = "friend"; // Default mode is Play with Friend
let gameOver = false;

function setMode(mode) {
    gameMode = mode;
    document.getElementById("difficulty").disabled = mode === "friend";
    resetGame();
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            document.getElementById("status").textContent = `Player ${board[a]} wins!`;
            gameOver = true;
            return;
        }
    }
    if (!board.includes("")) {
        document.getElementById("status").textContent = "It's a draw!";
        gameOver = true;
    }
}

function makeMove(index) {
    if (board[index] === "" && !gameOver) {
        board[index] = currentPlayer;
        document.getElementsByClassName("cell")[index].textContent = currentPlayer;
        checkWinner();

        if (!gameOver) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            document.getElementById("status").textContent = `Player ${currentPlayer}'s Turn`;

            if (gameMode === "ai" && currentPlayer === "O") {
                setTimeout(aiMove, 500);
            }
        }
    }
}

function aiMove() {
    let difficulty = document.getElementById("difficulty").value;
    let emptyCells = board.map((val, index) => val === "" ? index : null).filter(val => val !== null);

    if (emptyCells.length > 0) {
        let move;
        if (difficulty === "easy") {
            move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        } else if (difficulty === "medium") {
            move = findBestMove(0.5);
        } else {
            move = findBestMove(1);
        }
        board[move] = "O";
        document.getElementsByClassName("cell")[move].textContent = "O";
        checkWinner();

        if (!gameOver) {
            currentPlayer = "X";
            document.getElementById("status").textContent = "Player X's Turn";
        }
    }
}

function findBestMove(aggressiveness) {
    let emptyCells = board.map((val, index) => val === "" ? index : null).filter(val => val !== null);
    for (let cell of emptyCells) {
        let testBoard = [...board];
        testBoard[cell] = "O";
        if (checkPotentialWin(testBoard, "O")) return cell;
    }
    if (Math.random() > aggressiveness) {
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }
    for (let cell of emptyCells) {
        let testBoard = [...board];
        testBoard[cell] = "X";
        if (checkPotentialWin(testBoard, "X")) return cell;
    }
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

function checkPotentialWin(testBoard, player) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winningCombos.some(combo => {
        const [a, b, c] = combo;
        return testBoard[a] === player && testBoard[b] === player && testBoard[c] === player;
    });
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;
    document.getElementById("status").textContent = "Player X's Turn";
    document.querySelectorAll(".cell").forEach(cell => cell.textContent = "");
}

function newGame() {
    setMode(gameMode);
}
