import React, { useState } from "react";
import Square from "./components/Square";

export default function App() {
  /*Definición de estados de valor para los botones*/
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [historial, setHistorial] = useState([[...squares]]);

  /*Estado que define quien es el player a jugar */
  const [isCruz, setIsCruz] = useState(true);



  /*Método para calcular ganador en base a diferentes combinaciones en el tablero */
  const calculateWinner = (squares) => {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const isWinner = calculateWinner(squares);
  let status;
  if (isWinner) {
    status = "¡El ganador es " + isWinner+"!";
  } else {
    status = "Turno de : " + (isCruz ? "X" : "O");
  }

  /*Manejador de clicks para agregar marcas comprobando previamente que no exista un ganador aún y que el casillero aún no tenga una marca*/
  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquare = squares.slice();
    nextSquare[i] = isCruz ? "X" : "O";
    setSquares(nextSquare);
    /*Se agrega matriz a historial de movimientos adjuntando en el último indice quien realizó la jugada */
    setHistorial([...historial, [...nextSquare, isCruz ? "X" : "O"]]);
    setIsCruz(!isCruz);
  };

  /*Método para retroceder a un estado de jugada anteriormente realizado, recibiendo el método el estado del tablero en ese momento
  y el indice del mismo para así setear en el historial solamente los movimientos realizados hasta ese estado y cambiando el estado actual del tablero*/
  const timeTravel = (instant, key) => {
    const newHostorial = historial.slice(0, key + 1);
    setHistorial([...newHostorial]);
    setSquares(instant);
  };

  return (
    <div className="App">
      <h1 style={{textAlign:"center"}}>Proyecto: Tres en raya</h1>
      <div className="game">
      <div className="board">
      <div className="board-row">
        <Square index={1} handleClick={handleClick} value={squares[0]} />
        <Square index={2} handleClick={handleClick} value={squares[1]} />
        <Square index={3} handleClick={handleClick} value={squares[2]} />
      </div>
      <div className="board-row">
        <Square index={4} handleClick={handleClick} value={squares[3]} />
        <Square index={5} handleClick={handleClick} value={squares[4]} />
        <Square index={6} handleClick={handleClick} value={squares[5]} />
      </div>
      <div className="board-row">
        <Square index={7} handleClick={handleClick} value={squares[6]} />
        <Square index={8} handleClick={handleClick} value={squares[7]} />
        <Square index={9} handleClick={handleClick} value={squares[8]} />
      </div>
      </div>
      <div className="logs">
        <h2>{status}</h2>
        {historial.map((moment, index) =>
          moment.some((e) => e !== null) ? (
            <button
              key={index}
              onClick={() => timeTravel(moment.slice(0, 9), index)}
            >
              Movimiento de {moment[moment.length - 1]}
            </button>
          ) : (
            ""
          )
        )}
        {((historial.length>1&&calculateWinner(squares))|| squares.every((e)=>e)) && <button className="restart" onClick={()=>timeTravel(historial[0],0)}>Reiniciar</button>}
      </div>
    </div>
    </div>
  );
}
