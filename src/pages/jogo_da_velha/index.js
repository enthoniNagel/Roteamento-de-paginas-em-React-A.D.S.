import React, { useState } from 'react';
import './stayle.css';

function Square({ value, onClick }) {
  return (
    <button className={`square ${value}`} onClick={onClick}>
      {value}
    </button>
  );
}

function Board({ squares, xIsNext, handleClick, resetGame }) {
  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Ganhador: ' + winner;
  } else {
    status = 'Próximo jogador: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
      </div>
      <button className="reset-button" onClick={resetGame}>
        Começar Novamente
      </button>
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);

  const handleClick = (i) => {
    const squaresCopy = squares.slice();
    if (calculateWinner(squaresCopy) || squaresCopy[i]) {
      return;
    }
    squaresCopy[i] = xIsNext ? 'X' : 'O';
    setSquares(squaresCopy);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    
  };

  const winner = calculateWinner(squares);

  React.useEffect(() => {
    if (winner) {
      if (winner === 'X') {
        setXScore(prevScore => prevScore + 1);
      } else if (winner === 'O') {
        setOScore(prevScore => prevScore + 1);
      }
    }
  }, [winner, setXScore, setOScore]);

  return (
    <div className="game">
      <div className="scoreboard">
        <div className="score">
          <h2>Jogador X</h2>
          <p>{xScore}</p>
        </div>
        <div className="score">
          <h2>Jogador O</h2>
          <p>{oScore}</p>
        </div>
      </div>
      <Board
        squares={squares}
        xIsNext={xIsNext}
        handleClick={handleClick}
        resetGame={resetGame}
      />
    </div>
  );
}

export default App;