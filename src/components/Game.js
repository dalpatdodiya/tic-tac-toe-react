import React, { useState } from "react";
import Board from "./Board";

export default function Game() {
    const [game, setGame] = useState({
        xIsNext: true,
        stepNumber: 0,
        history: [{ squares: Array(9).fill(null) }],
    });

    const history = game.history;
    const current = history[game.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
        const desc = move ? "Go to Step #" + move : "Start the Game";
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    const jumpTo = (step) => {
        setGame((prev) => ({
            ...prev,
            stepNumber: step,
            xIsNext: step % 2 === 0,
        }));
    };

    let status;
    if (winner) {
        status = "Winner is : " + winner;
    } else {
        status = "Next Player is : " + (game.xIsNext ? "X" : "O");
    }

    const handleClick = (i) => {
        const history = game.history.slice(0, game.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const winner = calculateWinner(squares);
        // console.log(winner);
        if (winner || squares[i]) {
            return;
        }
        squares[i] = game.xIsNext ? "X" : "O";
        setGame({
            history: history.concat({ squares: squares }),
            xIsNext: !game.xIsNext,
            stepNumber: history.length,
        });
    };
    return (
        <div className="game">
            <div className="game-board">
                <Board
                    onClick={(i) => handleClick(i)}
                    squares={current.squares}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ul>{moves}</ul>
            </div>
        </div>
    );
}
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    // lines.map((i) => {
    //     const [a, b, c] = i;
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[b] === squares[c]
        )
            return squares[a];
    }
    // });
    return null;
}
