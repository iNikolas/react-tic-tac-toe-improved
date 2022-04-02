type GetActiveSquareElementLinkByCoordinates = (
  index: number
) => HTMLDivElement;

const getActiveSquareElementLinkByCoordinates: GetActiveSquareElementLinkByCoordinates =
  (index) => {
    return document.querySelector(`.square-${index}-active`)! as HTMLDivElement;
  };

export default getActiveSquareElementLinkByCoordinates;
