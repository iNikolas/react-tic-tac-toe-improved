export type Move = [col: number, row: number];
type GetMoveCoordinates = (i: number) => Move;

const getMoveCoordinates: GetMoveCoordinates = (i) => {
  const row = Math.ceil((i + 1) / 3);
  const col = (i + 1) % 3;

  return [col ? col : 3, row];
};

export default getMoveCoordinates;
