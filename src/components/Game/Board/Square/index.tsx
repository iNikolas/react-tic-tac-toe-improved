import React from "react";

export type Value = "X" | "O" | null;

interface Props {
  value: Value;
  onClick: () => void;
  i: number;
}

const Square: React.FC<Props> = ({ value, onClick, i }) => {
  return (
    <button onClick={onClick} className={`square square-${i}-active`}>
      {value}
    </button>
  );
};

export default Square;
