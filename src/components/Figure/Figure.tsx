import React from "react";
import classNames from "classnames";
import {CELL_SIZE} from "../../helpers/constants";
import {ETetrimino, TFigurePosition} from "../PlayField/types";
import "./Figure.scss";

type TFigureProps = {
  position: TFigurePosition;
  type: ETetrimino
};

export const Figure = ({position, type}: TFigureProps) => {
  return (
    <>
      {position.map((cell) => (
        <rect
          key={`${cell.x}-${cell.y}`}
          width={CELL_SIZE - 1}
          height={CELL_SIZE - 1}
          transform={`translate(${(cell.x - 1) * CELL_SIZE}, ${
            (cell.y - 1) * CELL_SIZE
          })`}
          className={classNames('cell', `cell--${type}`)}
        />
      ))}
    </>
  );
};
