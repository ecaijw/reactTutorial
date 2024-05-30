import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {useState} from 'react';

const user = {
    name: 'luke',
    imageUrl: 'https://d220yz93drhwe7.cloudfront.net/smp/general/bzai/bzai-logo.png'
};
function Square({value, onSquareClick}) {
    return (
        <button className = "square" onClick={onSquareClick}>
            {value || ''}
        </button>
    );
}

function Board({xIsNext, squares, onPlay}) {
    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        onPlay(nextSquares)
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = `Next Player: ${xIsNext ? 'X' : 'O'}`;
    }

    return (
        <>
        <div className='status'>
            {status}
            <p></p>
        </div>
        {[0,1,2].map(row =>
            <div className='board-row'>
                {[row*3,row*3+1,row*3+2].map(v => <Square value={squares[v]} onSquareClick={() => handleClick(v)}></Square>)}
            </div>

        )}
        </>
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

    for (let i = 0; i < lines.length; i++) {
        const [a,b,c] = lines[i];
        if (squares[a] && squares[a] == squares[b] && squares[b] == squares[c]) {
            return squares[a]
        }
    }
    return null;
}

let App = function MyApp() {
    console.log("App: render");

    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 == 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);

        console.log("nextSquares: " + nextSquares);
        console.log("nextHistory: " + nextHistory);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);

        // remove history
        const nextHistory = history.slice(0, nextMove + 1);
        setHistory(nextHistory);
    }

    const moves = history.map((square, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }

        // last step should be clickable
        let component;
        if (move == history.length - 1) {
            component =
            <div key={move}>
                {description}
            </div>;
        } else {
            component =
            <button onClick={() => jumpTo(move)}>
                {description}
            </button>;
}
        return (
            <li key = {move}>
                {component}
            </li>
        );
    });

    return (
        <div>
        <img src = {user.imageUrl}>
        </img>
        <h1>Welcome to Tic Tac Toe</h1>
        <div className='game'>
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}>

            </Board>
            <div className='game-info'>
                <ol>{moves}</ol>
            </div>
        </div>
        </div>
    );
}


const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);