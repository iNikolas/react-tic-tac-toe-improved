import { WinnerMoves } from "./calculateWinner";
import getActiveSquareElementLinkByCoordinates from "./getActiveAquareElementLinkByCoordinates";

type HighlightWinnerMoves = (winnerMoves: WinnerMoves) => void;

const highlightWinnerMoves: HighlightWinnerMoves = (winnerMoves) => {
  winnerMoves.forEach((coordinate) => {
    getActiveSquareElementLinkByCoordinates(coordinate).classList.add("active");
  });
};

export default highlightWinnerMoves;
