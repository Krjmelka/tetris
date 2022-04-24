import {ETetrimino} from "../components/PlayField/types";

export const COLUMNS_COUNT = 10;
export const ROWS_COUNT = 20;
export const CELL_SIZE = 10;

export const tetriminoStartPositions = {
  [ETetrimino.I]: [
    {x: 4, y: 1},
    {x: 5, y: 1},
    {x: 6, y: 1},
    {x: 7, y: 1},
  ],
  [ETetrimino.O]: [
    {x: 5, y: 1},
    {x: 6, y: 1},
    {x: 5, y: 2},
    {x: 6, y: 2},
  ],
  [ETetrimino.T]: [
    {x: 5, y: 2}, // center dot
    {x: 4, y: 2}, // left dot
    {x: 5, y: 1}, // top dot
    {x: 6, y: 2}, // right dot
  ],
  [ETetrimino.S]: [
    {x: 5, y: 2},
    {x: 6, y: 2},
    {x: 6, y: 1},
    {x: 7, y: 1},
  ],
  [ETetrimino.Z]: [
    {x: 6, y: 2},
    {x: 7, y: 2},
    {x: 5, y: 1},
    {x: 6, y: 1},
  ],
  [ETetrimino.J]: [
    {x: 4, y: 2},
    {x: 4, y: 1},
    {x: 5, y: 2},
    {x: 6, y: 2},
  ],
  [ETetrimino.L]: [
    {x: 4, y: 2},
    {x: 5, y: 2},
    {x: 6, y: 2},
    {x: 6, y: 1},
  ],
};
