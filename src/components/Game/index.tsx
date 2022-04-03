import React, { useState } from "react";
import Board from "./Board";
import { Value } from "./Board/Square";
import calculateWinner from "../../common/calculateWinner";
import getMoveCoordinates, { Move } from "../../common/getMoveCoordinates";
import getActiveSquareElementLinkByCoordinates from "../../common/getActiveAquareElementLinkByCoordinates";
import highlightWinnerMoves from "../../common/highlightWinnerMoves";
import clearHighlightedFields from "../../common/clearHighlightedFields";

export type Squares = Value[];
type History = {
  squares: Array<Squares>;
  xIsNext: boolean;
  stepNumber: number;
  moves: Array<Move>;
};
export type HandleClick = (i: number) => () => void;
type JumpTo = (move: number) => void;
type HandleMouseOverLeave = (move: number) => () => void;
type HandleSort = (moveA: Squares, moveB: Squares) => number;

const Game: React.FC = () => {
  const [history, setHistory] = useState<History>({
    squares: [Array(9).fill(null)],
    xIsNext: true,
    stepNumber: 0,
    moves: [],
  });
  const [sorting, setSorting] = useState(false);

  const handleToggleSorting = () => setSorting((prevState) => !prevState);

  const handleSort: HandleSort = (moveA, moveB) => {
    if (!sorting) return 0;

    const numberOfFilledSquaresA = moveA.filter((field) => !!field).length;
    const numberOfFilledSquaresB = moveB.filter((field) => !!field).length;

    return numberOfFilledSquaresB - numberOfFilledSquaresA;
  };

  const { squares, xIsNext, stepNumber, moves } = history;

  console.log('squares', squares)
  console.log('xIsNext', xIsNext)
  console.log('stepNumber', stepNumber)
  console.log('moves', moves)

  const [winner, winnerMoves] = calculateWinner(squares[stepNumber]);

  const status = winner
    ? `Winner: ${winner}`
    : squares.filter((square) => !!square).length < 10
    ? `Next player: ${xIsNext ? "X" : "O"}`
    : "Draw!";

  if (winner) highlightWinnerMoves(winnerMoves);

  const handleClick: HandleClick = (i) => () => {
    if (winner || squares[stepNumber][i]) return;

    setHistory((prevState) => {
      const { squares, xIsNext, stepNumber, moves } = prevState;
      const moveCoordinates = getMoveCoordinates(i);

      const newMove = [...squares[stepNumber]];
      newMove[i] = xIsNext ? "X" : "O";
      return {
        squares: squares.slice(0, stepNumber + 1).concat([newMove]),
        stepNumber: stepNumber + 1,
        xIsNext: !xIsNext,
        moves: moves.concat([moveCoordinates]),
      };
    });
  };

  const handleMouseOver: HandleMouseOverLeave = (move) => () => {
    if (!move) return;
    const index = moves[move - 1][0] + (moves[move - 1][1] - 1) * 3 - 1;
    getActiveSquareElementLinkByCoordinates(index).classList.add("active");
  };

  const handleMouseLeave: HandleMouseOverLeave = (move) => () => {
    if (!move) return;
    const index = moves[move - 1][0] + (moves[move - 1][1] - 1) * 3 - 1;
    getActiveSquareElementLinkByCoordinates(index).classList.remove("active");

    if (winner) highlightWinnerMoves(winnerMoves);
  };

  const jumpTo: JumpTo = (move) => {
    clearHighlightedFields();

    setHistory((prevState) => ({
      ...prevState,
      stepNumber: move,
      xIsNext: !(move % 2),
    }));
  };

  const movesHistory = [...squares].sort(handleSort).map((step) => {
    const move = step.filter((field) => !!field).length;

    const desc = move
      ? `Go to move #${move} (col: ${moves[move - 1][0]} row: ${
          moves[move - 1][1]
        })`
      : "Go to game start";

    return (
      <li key={move}>
        <button
          onMouseOver={handleMouseOver(move)}
          onMouseLeave={handleMouseLeave(move)}
          onClick={() => jumpTo(move)}
        >
          {desc}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={handleClick} squares={squares[stepNumber]} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>
          <button onClick={handleToggleSorting}>
            Order: {sorting ? "Desc" : "Asc"}
          </button>
          <br />
          <br />
          {movesHistory}
        </ol>
      </div>
    </div>
  );
};

export default Game;
