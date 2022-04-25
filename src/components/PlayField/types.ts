import {Tetrimino_I} from "../../helpers/tetrimino_I.helper";
import {Tetrimino_J} from "../../helpers/tetrimino_J.helper";
import {Tetrimino_L} from "../../helpers/tetrimino_L.helper";
import {Tetrimino_O} from "../../helpers/tetrimino_O.helper";
import {Tetrimino_S} from "../../helpers/tetrimino_S.helper";
import {Tetrimino_T} from "../../helpers/tetrimino_T.helper";
import {Tetrimino_Z} from "../../helpers/tetrimino_Z.helper";

export type TPosition = {
  x: number;
  y: number;
};

export type TFilledCell = {
  type: ETetrimino
} & TPosition

export type TFilledArea = TFilledCell[]

export enum ETetrimino {
  I = "I",
  O = "O",
  T = "T",
  S = "S",
  Z = "Z",
  J = "J",
  L = "L",
}

export type TFigurePosition = TPosition[];

export enum ERotateDeg {
  "deg0",
  "deg90",
  "deg180",
  "deg270",
}

export enum EAllowedKeyCode {
  ArrowRight = "ArrowRight",
  ArrowDown = "ArrowDown",
  ArrowLeft = "ArrowLeft",
  ArrowUp = "ArrowUp",
}

export type TTetrimino = Tetrimino_I |
  Tetrimino_O |
  Tetrimino_T |
  Tetrimino_S |
  Tetrimino_Z |
  Tetrimino_J |
  Tetrimino_L;
