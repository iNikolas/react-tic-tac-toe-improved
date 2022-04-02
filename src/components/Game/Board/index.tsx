import React from "react";
import Square from "./Square";
import { HandleClick, Squares } from "../index";

interface Props {
  squares: Squares;
  onClick: HandleClick;
}

const Board: React.FC<Props> = ({ squares, onClick }) => {
  const renderSquare = (i: number) => (
    <Square key={i} i={i} onClick={onClick(i)} value={squares[i]} />
  );

  const renderSquares = () => {
    const container: Array<JSX.Element> = [];
    for (let j = 0; j < 3; j++) {
      const squares = [];

      for (let y = 0; y < 3; y++) squares.push(renderSquare(j * 3 + y));

      container.push(
        <div key={j} className="board-row">
          {squares}
        </div>
      );
    }

    return container;
  };

  return <div>{renderSquares()}</div>;
};

export default Board;
