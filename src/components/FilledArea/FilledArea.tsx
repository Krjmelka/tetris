import React from "react";
import classNames from 'classnames';
import {TFilledArea} from "../PlayField/types";
import {CELL_SIZE} from "../../helpers/constants";
import '../Figure/Figure.scss';

export const FilledArea = ({filledData}: {filledData: TFilledArea}) => {
  return (
    <>
      {filledData.map(({x, y, type}) => (
        <rect
          key={`filled${x}-${y}`}
          width={CELL_SIZE - 1}
          height={CELL_SIZE - 1}
          transform={`translate(${(x - 1) * CELL_SIZE}, ${
            (y - 1) * CELL_SIZE
          })`}
          className={classNames("cell", `cell--${type}`)}
        />
      ))}
    </>
  );
};
