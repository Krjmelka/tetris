import {Figure} from "./figure.helper";
import {ETetrimino, TFigurePosition} from "../components/PlayField/types";

export class Tetrimino_I extends Figure {
  constructor() {
    super(ETetrimino.I);
  }

  rotate(): TFigurePosition {
    let updatedPosition: TFigurePosition;
    switch (this.rotatedDeg) {
      case 0:
        updatedPosition = this.position.reduce<TFigurePosition>((acc, curr) => {
          return [
            ...acc,
            {
              x: this.position[2].x,
              y: !!acc.length ? acc[acc.length - 1].y + 1 : curr.y - 1,
            },
          ];
        }, []);
        this.rotatedDeg = 90;
        break;
      case 90:
        updatedPosition = this.position.reduce<TFigurePosition>((acc, curr) => {
          return [
            ...acc,
            {
              x: !!acc.length ? acc[acc.length - 1].x + 1 : curr.x - 2,
              y: this.position[2].y,
            },
          ];
        }, []);
        this.rotatedDeg = 180;
        break;
      case 180:
        updatedPosition = this.position.reduce<TFigurePosition>((acc, curr) => {
          return [
            ...acc,
            {
              x: this.position[1].x,
              y: !!acc.length ? acc[acc.length - 1].y + 1 : curr.y - 2,
            },
          ];
        }, []);
        this.rotatedDeg = 270;
        break;
      case 270:
        updatedPosition = this.position.reduce<TFigurePosition>((acc, curr) => {
          return [
            ...acc,
            {
              x: !!acc.length ? acc[acc.length - 1].x + 1 : curr.x - 1,
              y: this.position[1].y,
            },
          ];
        }, []);
        this.rotatedDeg = 0;
        break;
      default:
        updatedPosition = this.position;
    }
    updatedPosition = this.updateRotatedFigureWithOffset(updatedPosition);
    this.position = updatedPosition;
    return updatedPosition;
  }
}
