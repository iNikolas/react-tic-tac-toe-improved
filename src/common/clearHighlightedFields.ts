import getActiveSquareElementLinkByCoordinates from "./getActiveAquareElementLinkByCoordinates";

const clearHighlightedFields = () => {
  for (let i = 0; i < 9; i++)
    getActiveSquareElementLinkByCoordinates(i).classList.remove("active");
};

export default clearHighlightedFields;
