import {Figure} from "./figure.helper";
import {ETetrimino, TFigurePosition} from "../components/PlayField/types";

export class Tetrimino_J extends Figure {
  constructor() {
    super(ETetrimino.J);
  }

  rotate(): TFigurePosition {
    let updatedPosition: TFigurePosition;
    switch (this.rotatedDeg) {
      case 0:
        updatedPosition = this.position.reduce<TFigurePosition>(
          (acc, curr, index) => {
            if (index === 2) {
              return [
                ...acc,
                {
                  x: this.position[1].x,
                  y: this.position[1].y - 1,
                },
              ];
            } else if (index === 3) {
              return [
                ...acc,
                {
                  x: this.position[1].x + 1,
                  y: this.position[1].y - 1,
                },
              ];
            } else {
              return [...acc, {...curr}];
            }
          },
          []
        );
        this.rotatedDeg = 90;
        break;
      case 90:
        updatedPosition = this.position.reduce<TFigurePosition>(
          (acc, curr, index) => {
            if (index === 0) {
              return [
                ...acc,
                {
                  x: this.position[3].x + 1,
                  y: this.position[3].y,
                },
              ];
            } else if (index === 1) {
              return [
                ...acc,
                {
                  x: this.position[3].x + 1,
                  y: this.position[3].y + 1,
                },
              ];
            } else {
              return [...acc, {...curr}];
            }
          },
          []
        );
        this.rotatedDeg = 180;
        break;
      case 180:
        updatedPosition = this.position.reduce<TFigurePosition>(
          (acc, curr, index) => {
            if (index === 2) {
              return [
                ...acc,
                {
                  x: this.position[1].x,
                  y: this.position[1].y + 1,
                },
              ];
            } else if (index === 3) {
              return [
                ...acc,
                {
                  x: this.position[1].x - 1,
                  y: this.position[1].y + 1,
                },
              ];
            } else {
              return [...acc, {...curr}];
            }
          },
          []
        );
        this.rotatedDeg = 270;
        break;
      case 270:
        updatedPosition = this.position.reduce<TFigurePosition>(
          (acc, curr, index) => {
            if (index === 0) {
              return [
                ...acc,
                {
                  x: this.position[3].x - 1,
                  y: this.position[3].y,
                },
              ];
            } else if (index === 1) {
              return [
                ...acc,
                {
                  x: this.position[3].x - 1,
                  y: this.position[3].y - 1,
                },
              ];
            } else {
              return [...acc, {...curr}];
            }
          },
          []
        );
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
