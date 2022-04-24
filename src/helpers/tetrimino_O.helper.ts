import {Figure} from "./figure.helper";
import {ETetrimino, TFigurePosition} from "../components/PlayField/types";

export class Tetrimino_O extends Figure {
  constructor() {
    super(ETetrimino.O);
  }

  rotate(): TFigurePosition {
    return this.position;
  }
}
