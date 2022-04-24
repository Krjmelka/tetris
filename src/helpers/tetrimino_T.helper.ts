import {Figure} from "./figure.helper";
import {ETetrimino, TFigurePosition} from "../components/PlayField/types";

export class Tetrimino_T extends Figure {
  constructor() {
    super(ETetrimino.T);
  }

  rotate(): TFigurePosition {
    let updatedPosition: TFigurePosition;
    switch (this.rotatedDeg) {
      case 0:
        updatedPosition = this.position.reduce<TFigurePosition>(
          (acc, curr, index) => {
            if (index === 0) {
              // center dot without changes
              return [...acc, {...curr}];
            } else if (index === 3) {
              return [
                ...acc,
                {
                  x: this.position[0].x,
                  y: this.position[0].y + 1,
                },
              ];
            } else {
              // calc for left and top dots
              return [
                ...acc,
                {
                  x: this.position[index + 1].x,
                  y: this.position[index + 1].y,
                },
              ];
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
              // center dot without changes
              return [...acc, {...curr}];
            } else if (index === 3) {
              return [
                ...acc,
                {
                  x: this.position[0].x - 1,
                  y: this.position[0].y,
                },
              ];
            } else {
              // calc for left and top dots
              return [
                ...acc,
                {
                  x: this.position[index + 1].x,
                  y: this.position[index + 1].y,
                },
              ];
            }
          },
          []
        );
        this.rotatedDeg = 180;
        break;
      case 180:
        updatedPosition = this.position.reduce<TFigurePosition>(
          (acc, curr, index) => {
            if (index === 0) {
              // center dot without changes
              return [...acc, {...curr}];
            } else if (index === 3) {
              return [
                ...acc,
                {
                  x: this.position[0].x,
                  y: this.position[0].y - 1,
                },
              ];
            } else {
              // calc for left and top dots
              return [
                ...acc,
                {
                  x: this.position[index + 1].x,
                  y: this.position[index + 1].y,
                },
              ];
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
              // center dot without changes
              return [...acc, {...curr}];
            } else if (index === 3) {
              return [
                ...acc,
                {
                  x: this.position[0].x + 1,
                  y: this.position[0].y,
                },
              ];
            } else {
              // calc for left and top dots
              return [
                ...acc,
                {
                  x: this.position[index + 1].x,
                  y: this.position[index + 1].y,
                },
              ];
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
