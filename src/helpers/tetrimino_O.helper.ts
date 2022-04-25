import {Figure} from "./figure.helper";
import {ETetrimino, TFigurePosition} from "../components/PlayField/types";

export class Tetrimino_O extends Figure {
  constructor(cb: (data: TFigurePosition, type: ETetrimino) => void ) {
    super(ETetrimino.O, cb);
  }

  rotate(): TFigurePosition {
    return this.position;
  }
}
