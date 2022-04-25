import {ETetrimino} from "../components/PlayField/types";
import {Tetrimino_I} from "./tetrimino_I.helper";
import {Tetrimino_J} from "./tetrimino_J.helper";
import {Tetrimino_L} from "./tetrimino_L.helper";
import {Tetrimino_O} from "./tetrimino_O.helper";
import {Tetrimino_S} from "./tetrimino_S.helper";
import {Tetrimino_T} from "./tetrimino_T.helper";
import {Tetrimino_Z} from "./tetrimino_Z.helper";

export const COLUMNS_COUNT = 10;
export const ROWS_COUNT = 20;
export const CELL_SIZE = 10;

export const tetriminoStartPositions = {
  [ETetrimino.I]: [
    {x: 4, y: 0},
    {x: 5, y: 0},
    {x: 6, y: 0},
    {x: 7, y: 0},
  ],
  [ETetrimino.O]: [
    {x: 5, y: 0},
    {x: 6, y: 0},
    {x: 5, y: 1},
    {x: 6, y: 1},
  ],
  [ETetrimino.T]: [
    {x: 5, y: 1}, // center dot
    {x: 4, y: 1}, // left dot
    {x: 5, y: 0}, // top dot
    {x: 6, y: 1}, // right dot
  ],
  [ETetrimino.S]: [
    {x: 5, y: 1},
    {x: 6, y: 1},
    {x: 6, y: 0},
    {x: 7, y: 0},
  ],
  [ETetrimino.Z]: [
    {x: 6, y: 1},
    {x: 7, y: 1},
    {x: 5, y: 0},
    {x: 6, y: 0},
  ],
  [ETetrimino.J]: [
    {x: 4, y: 1},
    {x: 4, y: 0},
    {x: 5, y: 1},
    {x: 6, y: 1},
  ],
  [ETetrimino.L]: [
    {x: 4, y: 1},
    {x: 5, y: 1},
    {x: 6, y: 1},
    {x: 6, y: 0},
  ],
};

export const tetriminoClassMap = {
  [ETetrimino.I]: Tetrimino_I,
  [ETetrimino.J]: Tetrimino_J,
  [ETetrimino.L]: Tetrimino_L,
  [ETetrimino.O]: Tetrimino_O,
  [ETetrimino.S]: Tetrimino_S,
  [ETetrimino.T]: Tetrimino_T,
  [ETetrimino.Z]: Tetrimino_Z,
};
