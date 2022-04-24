import React, {useEffect, useState, useCallback} from "react";
import "./PlayField.scss";

// import { Tetrimino_I } from "../../helpers/tetrimino_I.helper";
// import { Tetrimino_O } from "../../helpers/tetrimino_O.helper";
// import {Tetrimino_T} from "../../helpers/tetrimino_T.helper";
import {TTetrimino} from "./types";
import {EAllowedKeyCode, TFigurePosition} from "./types";
import {Figure} from "../Figure/Figure";
import {CELL_SIZE, COLUMNS_COUNT, ROWS_COUNT} from "../../helpers/constants";
// import { Tetrimino_S } from "../../helpers/tetrimino_S.helper";
// import { Tetrimino_Z } from "../../helpers/tetrimino_Z.helper";
// import { Tetrimino_J } from "../../helpers/tetrimino_J.helper";
import { Tetrimino_L } from "../../helpers/tetrimino_L.helper";

export const PlayField = () => {
  const [figure, setFigure] = useState<TTetrimino | null>(null);
  const [figurePosition, setFigurePosition] = useState<TFigurePosition | null>(
    null
  );
  const [tick, setTick] = useState<number | null>(null);

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (!figure) return;
      if (Object.values(EAllowedKeyCode).some((code) => code === e.code)) {
        if (e.code === EAllowedKeyCode.ArrowUp) {
          setFigurePosition(figure.rotate());
          console.log(figure);
        } else {
          setFigurePosition(figure.move(e.code as EAllowedKeyCode));
        }
      }
    },
    [figure]
  );

  useEffect(() => {
    const figure = new Tetrimino_L();
    setFigure(figure);
    setFigurePosition(figure.draw());
  }, []);

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => document.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTick(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);


  useEffect(() => {
    if(tick && figure) {
        setFigurePosition(figure.move(EAllowedKeyCode.ArrowDown))
    }
  }, [tick, figure])

  return (
    <div className="play-field">
      <svg
        className="play-field-svg"
        viewBox={`0 0 ${COLUMNS_COUNT * CELL_SIZE} ${ROWS_COUNT * CELL_SIZE}`}
      >
        {figure && figurePosition && <Figure position={figurePosition} type={figure.type} />}
      </svg>
    </div>
  );
};
