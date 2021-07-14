import { useState } from "react";

export const Square = ({value, onClick}) => {
    //const [value, setValue] = useState(null)

    return (
      <button className="square" onClick={onClick}>
        {value}
      </button>
    );
}

//const TicTacToeSquare = ({index}) => <Square value={index} />

export const Board = () => {
    
    const [square, setSquare] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    const winner = calculateWinner(square);
    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else {
        status = `Next player: ${xIsNext ? 'X' : 'O'}`
    }

    //const a = square.slice();

    const handleClick = (i) => {
        const squares = square.slice();
        if (calculateWinner(square) || square[i]) {
            return ;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        setSquare(squares);
        setXIsNext(!xIsNext);
    }
  
    return (
        <div>
            <div className='status'>{status}</div>
            <div className='board-row'>
                <Square 
                    value={square[0]} 
                    onClick={() => handleClick(0)} />
                <Square 
                    value={square[1]} 
                    onClick={() => handleClick(1)} />
                <Square 
                    value={square[2]} 
                    onClick={() => handleClick(2)} />
            </div>
            <div className='board-row'>
                <Square 
                    value={square[3]} 
                    onClick={() => handleClick(3)} />
                <Square 
                    value={square[4]} 
                    onClick={() => handleClick(4)} />
                <Square 
                    value={square[5]} 
                    onClick={() => handleClick(5)} />
            </div>
            <div className='board-row'>
                <Square 
                    value={square[6]} 
                    onClick={() => handleClick(6)} />
                <Square 
                    value={square[7]} 
                    onClick={() => handleClick(7)} />
                <Square 
                    value={square[8]} 
                    onClick={() => handleClick(8)} />
            </div>
        </div>
    )
}

export const Game = () => {
    //const [history, setHistory] = useState([{square: Array(9).fill(null)}])
    //const [xIsNext, setXIsNext] = useState(true);

    return (
        <div className='game'>
            <div className='game-board'>
                <Board />
            </div>
            <div className='game-info'>
                <div>{/* status */}</div>
                <ol>{/* Todo */}</ol>
            </div>
        </div>
    )
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