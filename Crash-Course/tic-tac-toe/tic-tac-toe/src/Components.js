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

export const Board = ({square, onClick}) => {
    
    //const [square, setSquare] = useState(Array(9).fill(null));
    //const [xIsNext, setXIsNext] = useState(true);

    /* const winner = calculateWinner(square);
    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else {
        status = `Next player: ${xIsNext ? 'X' : 'O'}`
    }
 */
    //const a = square.slice();

    /* const handleClick = (i) => {
        const squares = square.slice();
        if (calculateWinner(square) || square[i]) {
            return ;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        setSquare(squares);
        setXIsNext(!xIsNext);
    } */
  
    return (
        <div>
            <div className='board-row'>
                <Square 
                    value={square[0]} 
                    onClick={() => onClick(0)} />
                <Square 
                    value={square[1]} 
                    onClick={() => onClick(1)} />
                <Square 
                    value={square[2]} 
                    onClick={() => onClick(2)} />
            </div>
            <div className='board-row'>
                <Square 
                    value={square[3]} 
                    onClick={() => onClick(3)} />
                <Square 
                    value={square[4]} 
                    onClick={() => onClick(4)} />
                <Square 
                    value={square[5]} 
                    onClick={() => onClick(5)} />
            </div>
            <div className='board-row'>
                <Square 
                    value={square[6]} 
                    onClick={() => onClick(6)} />
                <Square 
                    value={square[7]} 
                    onClick={() => onClick(7)} />
                <Square 
                    value={square[8]} 
                    onClick={() => onClick(8)} />
            </div>
        </div>
    )
}

export const Game = () => {
    const [history, setHistory] = useState([{squares: Array(9).fill(null)}])
    const [xIsNext, setXIsNext] = useState(true);

    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    
    const moves = history.map((step, move) => {
        const desc = move ?
            `Go to move # ${move}` : 'Go to game start';
        return (
            <li>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
        );       
    });
    
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O')
    }

    const handleClick = (i) => {
        const current = history[history.length - 1];
        const squares = current.square.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        setHistory(history.concat([squares]))
        setXIsNext(!xIsNext)

    }

    return (
        <div className='game'>
            <div className='game-board'>
                <Board 
                    square={current.square}
                    onClick={(i) => handleClick(i)}
                />
            </div>
            <div className='game-info'>
                <div>{status}</div>
                <ol>{moves}</ol>
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