import {
  COLUMNS_COUNT,
  ROWS_COUNT,
  tetriminoStartPositions,
  tetriminoClassMap,
} from "./constants";
import {
  EAllowedKeyCode,
  ETetrimino,
  TFigurePosition,
  TFilledArea,
  TPosition,
} from "../components/PlayField/types";

export const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;
export class Figure {
  type: ETetrimino;
  position: TFigurePosition = [];
  protected rotatedDeg: number = 0;
  onFigurePositionEndCb: (data: TFigurePosition, type: ETetrimino) => void;
  constructor(
    type: ETetrimino,
    cb: (data: TFigurePosition, type: ETetrimino) => void
  ) {
    this.type = type;
    this.onFigurePositionEndCb = cb;
  }

  draw(): TFigurePosition {
    const figurePosition = tetriminoStartPositions[this.type];
    this.position = figurePosition;
    return figurePosition;
  }

  move(
    direction: EAllowedKeyCode,
    offset = 1,
    filledAreaData?: TFilledArea
  ): TFigurePosition {
    switch (direction) {
      case EAllowedKeyCode.ArrowLeft:
        if (this.position.some(({x}) => x === 1 || x - offset < 1)) {
          return this.position;
        } else {
          const updatedPosition = this.position.map<TPosition>(({x, y}) => ({
            x: x - offset,
            y,
          }));
          if (
            filledAreaData &&
            this.checkIfFigurePositionEnded(updatedPosition, filledAreaData)
          ) {
            return this.position;
          } else {
            this.position = updatedPosition;
            return updatedPosition;
          }
        }
      case EAllowedKeyCode.ArrowRight:
        if (
          this.position.some(
            ({x}) => x === COLUMNS_COUNT || x + offset > COLUMNS_COUNT
          )
        ) {
          return this.position;
        } else {
          const updatedPosition = this.position.map<TPosition>(({x, y}) => ({
            x: x + offset,
            y,
          }));
          if (
            filledAreaData &&
            this.checkIfFigurePositionEnded(updatedPosition, filledAreaData)
          ) {
            return this.position;
          } else {
            this.position = updatedPosition;
            return updatedPosition;
          }
        }
      case EAllowedKeyCode.ArrowDown:
        if (
          this.position.some(
            ({y}) => y === ROWS_COUNT || y + offset > ROWS_COUNT
          )
        ) {
          this.onFigurePositionEndCb(this.position, this.type);
          return this.position;
        } else {
          const updatedPosition = this.position.map<TPosition>(({x, y}) => ({
            x,
            y: y + offset,
          }));
          if (
            filledAreaData &&
            this.checkIfFigurePositionEnded(updatedPosition, filledAreaData)
          ) {
            this.onFigurePositionEndCb(this.position, this.type);
            return this.position;
          } else {
            this.position = updatedPosition;
            return updatedPosition;
          }
        }
      case EAllowedKeyCode.ArrowUp:
        if (this.position.some(({y}) => y === 1 || y - offset < 1)) {
          return this.position;
        } else {
          const updatedPosition = this.position.map<TPosition>(({x, y}) => ({
            x,
            y: y - offset,
          }));
          this.position = updatedPosition;
          return updatedPosition;
        }

      default:
        return this.position;
    }
  }

  checkIfFigurePositionEnded(
    figurePosition: TFigurePosition,
    filledAreaData: TFilledArea
  ): boolean {
    const matchCells = figurePosition.filter((figure) =>
      filledAreaData.some((item) => item.x === figure.x && item.y === figure.y)
    );
    return !!matchCells.length;
  }

  updateRotatedFigureWithOffset(
    updatedPosition: TFigurePosition
  ): TFigurePosition {
    if (updatedPosition.some(({x, y}) => x < 1)) {
      const found = updatedPosition.filter(({x}) => x < 1);
      const offsetSmallest = Math.min.apply(
        Math,
        found.map(({x}) => x)
      );
      const offset = offsetSmallest + 1;
      this.position = updatedPosition;
      return this.move(EAllowedKeyCode.ArrowRight, offset);
    } else if (updatedPosition.some(({x, y}) => x > COLUMNS_COUNT)) {
      const found = updatedPosition.filter(({x}) => x > COLUMNS_COUNT);
      const offsetBiggest = Math.max.apply(
        Math,
        found.map(({x}) => x)
      );
      const offset = offsetBiggest - COLUMNS_COUNT;
      this.position = updatedPosition;
      return this.move(EAllowedKeyCode.ArrowLeft, offset);
    } else if (updatedPosition.some(({x, y}) => y < 1)) {
      const found = updatedPosition.filter(({y}) => y < 1);
      const offsetSmallest = Math.min.apply(
        Math,
        found.map(({y}) => y)
      );
      const offset = offsetSmallest + 1;
      this.position = updatedPosition;
      return this.move(EAllowedKeyCode.ArrowDown, offset);
    } else {
      return updatedPosition;
    }
  }
}

export const generateNewRandomFigure = (
  cb: (data: TFigurePosition, type: ETetrimino) => void
) => {
  const figureKeys = Object.keys(ETetrimino) as ETetrimino[];
  const randomKey = figureKeys[random(0, figureKeys.length)];
  return new tetriminoClassMap[randomKey](cb);
};

export const cutFilledRows = (filledData: TFilledArea): TFilledArea => {
  const filledRowsCount = filledData.reduce((acc, curr) => {
    if (acc[curr.y]) {
      acc[curr.y] += 1;
      return acc;
    } else {
      acc[curr.y] = 1;
      return acc;
    }
  }, {} as Record<number, number>);

  const rowsToCut = Object.entries(filledRowsCount).reduce(
    (acc, [row, count]) => {
      if (count === 10) {
        return [...acc, +row];
      } else {
        return acc;
      }
    },
    [] as number[]
  );

  const rowCutStart = Math.min.apply(Math, rowsToCut);

  if (!rowsToCut.length) return filledData;

  return filledData.reduce<TFilledArea>((acc, curr) => {
    if (rowsToCut.some((item) => item === curr.y)) {
      return acc;
    } else if (curr.y < rowCutStart) {
      return [...acc, {...curr, y: curr.y + rowsToCut.length}];
    } else {
      return [...acc, {...curr}];
    }
  }, []);
};
