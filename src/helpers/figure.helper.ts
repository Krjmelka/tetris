import {COLUMNS_COUNT, ROWS_COUNT, tetriminoStartPositions} from "./constants";
import {
  EAllowedKeyCode,
  ETetrimino,
  TFigurePosition,
  TPosition,
} from "../components/PlayField/types";

export class Figure {
  type: ETetrimino;
  position: TFigurePosition = [];
  protected rotatedDeg: number = 0;
  constructor(type: ETetrimino) {
    this.type = type;
  }

  draw(): TFigurePosition {
    const figurePosition = tetriminoStartPositions[this.type];
    this.position = figurePosition;
    return figurePosition;
  }

  move(direction: EAllowedKeyCode, offset = 1): TFigurePosition {
    switch (direction) {
      case EAllowedKeyCode.ArrowLeft:
        if (this.position.some(({x}) => x === 1 || x - offset < 1)) {
          return this.position;
        } else {
          const updatedPosition = this.position.map<TPosition>(({x, y}) => ({
            x: x - offset,
            y,
          }));
          this.position = updatedPosition;
          return updatedPosition;
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
          this.position = updatedPosition;
          return updatedPosition;
        }
      case EAllowedKeyCode.ArrowDown:
        if (
          this.position.some(
            ({y}) => y === ROWS_COUNT || y + offset > ROWS_COUNT
          )
        ) {
          return this.position;
        } else {
          const updatedPosition = this.position.map<TPosition>(({x, y}) => ({
            x,
            y: y + offset,
          }));
          this.position = updatedPosition;
          return updatedPosition;
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
