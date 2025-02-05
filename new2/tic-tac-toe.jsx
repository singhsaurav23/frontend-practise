import React, { useState } from "react";

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

// Check if there's a winner or a draw
const checkWinner = (board: string[]) => {
    for (let [a, b, c] of winningCombinations) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a]; // Return winner (X or O)
        }
    }
    return board.includes("") ? null : "Draw"; // Return "Draw" if board is full
};

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(""));
    const [currentPlayer, setCurrentPlayer] = useState < "X" | "O" > ("X");
    const winner = checkWinner(board);

    const handleClick = (index: number) => {
        if (board[index] || winner) return; // Ignore if cell is filled or game over

        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    };

    const resetGame = () => {
        setBoard(Array(9).fill(""));
        setCurrentPlayer("X");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Tic Tac Toe</h1>

            <div className="grid grid-cols-3 gap-2">
                {board.map((value, index) => (
                    <button
                        key={index}
                        className="w-20 h-20 border-2 border-gray-500 flex items-center justify-center text-2xl font-bold"
                        onClick={() => handleClick(index)}
                    >
                        {value}
                    </button>
                ))}
            </div>

            <h2 className="text-xl font-semibold mt-4">
                {winner ? (winner === "Draw" ? "It's a Draw!" : `Winner: ${winner}`) : `Turn: ${currentPlayer}`}
            </h2>

            <button
                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={resetGame}
            >
                Restart Game
            </button>
        </div>
    );
};

export default TicTacToe;
