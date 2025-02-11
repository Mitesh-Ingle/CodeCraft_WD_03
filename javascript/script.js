let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

function createBoard() {
    const boardContainer = document.getElementById('board');
    boardContainer.innerHTML = '';
    board.forEach((value, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.innerText = value;
        cell.addEventListener('click', () => makeMove(index));
        boardContainer.appendChild(cell);
    });
}

function makeMove(index) {
    if (board[index] === '' && gameActive) {
        board[index] = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        checkWinner();
        createBoard();
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            document.getElementById('winner').innerText = `Winner: ${board[a]}`;
            gameActive = false;
            return;
        }
    }
    if (!board.includes('')) {
        document.getElementById('winner').innerText = 'Draw!';
        gameActive = false;
    }
}

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    document.getElementById('winner').innerText = '';
    createBoard();
}

function newGame() {
    resetBoard();
    currentPlayer = 'X';
}

createBoard();
function checkWin() {
    return winningCombinations.some(combination => {
        if (combination.every(index => gameState[index] === currentPlayer)) {
            setTimeout(() => {
                combination.forEach(index => {
                    cells[index].classList.add('winning-combo');
                });
            }, 100);
            highlightWinner(currentPlayer);
            return true;
        }
        return false;
    });
}
function resetGame() {
    // ... existing code ...
    status.classList.remove('winner-text');
    document.querySelectorAll('.winning-combo').forEach(cell => {
        cell.classList.remove('winning-combo');
    });
    document.querySelectorAll('.neon-particle').forEach(p => p.remove());
}