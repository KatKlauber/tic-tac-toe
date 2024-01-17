import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";

import { WINNING_COMBINATIONS } from './winning-combinations.js';

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
};

const PLAYERS = {
  X: "Player 1",
  O: "Player 2"
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveWinner(gameBoard, players) {
  let winner = null;
  
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    
    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  };
  return winner;
};

function getGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];
  
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    
    gameBoard[row][col] = player;
  }
  return gameBoard;
};

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");
  
  const currentPlayer = deriveActivePlayer(gameTurns);
  
  // let currentPlayer = "X";
  //
  // if (gameTurns.length > 0 && gameTurns[0].player === "X") {
  //   currentPlayer = "O";
  // }
  
  const gameBoard = getGameBoard(gameTurns);
  
  const winner = deriveWinner(gameBoard, players);
  
  
  const hasDraw = gameTurns.length === 9 && !winner;
  
  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => curActivePlayer === "X" ? "O" : "X");
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      // let currentPlayer = "X";
      // if (prevTurns.length > 0 && prevTurns[0].player === "X") {
      //   currentPlayer = "O";
      // }
      const updatedTurns = [{ square: {row: rowIndex, col: colIndex}, player: currentPlayer }, ...prevTurns];
      return updatedTurns;
    });
  };
  
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  };
  
  function clearGame() {
    setGameTurns([]);
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player onChangeName={handlePlayerNameChange} isActive={currentPlayer === "X"} initialName={PLAYERS.X} symbol="X" />
          <Player onChangeName={handlePlayerNameChange} isActive={currentPlayer === "O"} initialName={PLAYERS.O} symbol="O" />
        </ol>
        {(winner || hasDraw) && (
          <GameOver onRestart={clearGame} winner={winner} />
        )}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
