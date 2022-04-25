import React, {useEffect, useState, useCallback, useMemo} from "react";
import _ from "lodash";
import "./PlayField.scss";

import {
  ETetrimino,
  TFilledArea,
  TFilledCell,
  TTetrimino,
  TFigurePosition,
  EAllowedKeyCode,
} from "./types";
import {Figure} from "../Figure/Figure";
import {CELL_SIZE, COLUMNS_COUNT, ROWS_COUNT} from "../../helpers/constants";
import {FilledArea} from "../FilledArea/FilledArea";
import {
  cutFilledRows,
  generateNewRandomFigure,
} from "../../helpers/figure.helper";
import {ControlPanel} from "../ControlPanel/ControlPanel";

export const PlayField = () => {
  const [figure, setFigure] = useState<TTetrimino | null>(null);
  const [figurePosition, setFigurePosition] = useState<TFigurePosition | null>(
    null
  );
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [tick, setTick] = useState<number | null>(null);
  const [filledData, setFilledData] = useState<TFilledArea>([]);

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (!figure) return;
      if (Object.values(EAllowedKeyCode).some((code) => code === e.code)) {
        if (e.code === EAllowedKeyCode.ArrowUp) {
          setFigurePosition(figure.rotate());
        } else {
          setFigurePosition(
            figure.move(e.code as EAllowedKeyCode, undefined, filledData)
          );
        }
      }
    },
    [figure, filledData]
  );

  const handleOnFigurePositionEnd = useCallback(
    (figurePosition: TFigurePosition, type: ETetrimino) => {
      const dataToFill = figurePosition.map<TFilledCell>((position) => ({
        ...position,
        type,
      }));
      setFilledData((prev) => [...prev, ...dataToFill]);
      setFigure(null);
      setFigurePosition(null);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [intervalId]
  );

  const createNewFigure = useCallback(() => {
    const figure = generateNewRandomFigure(handleOnFigurePositionEnd);
    setFigure(figure);
    const figurePosition = figure.draw();
    if (figure.checkIfFigurePositionEnded(figurePosition, filledData)) {
      window.clearInterval(intervalId as number);
      setIntervalId(null);
      setFigure(null);
      setFigurePosition(null);
      window.alert("GAME OVER");
    } else {
      setFigurePosition(figurePosition);
    }
  }, [handleOnFigurePositionEnd, filledData, intervalId]);

  useEffect(() => {
    if (intervalId) {
      createNewFigure();
    } else {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalId, createNewFigure]);

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => document.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTick(Date.now());
    }, 1000);
    setIntervalId(intervalId);

    return () => {
      window.clearInterval(intervalId);
      setIntervalId(null);
    };
  }, []);

  useEffect(() => {
    if (tick && figure) {
      setFigurePosition(
        figure.move(EAllowedKeyCode.ArrowDown, undefined, filledData)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick, figure]);

  const filledDataParsed = useMemo(() => {
    return !!filledData.length ? cutFilledRows(filledData) : [];
  }, [filledData]);

  useEffect(() => {
    if (!_.isEqual(filledData, filledDataParsed)) {
      setFilledData(filledDataParsed);
    }
  }, [filledData, filledDataParsed]);

  return (
    <div className="play-field">
      <svg
        className="play-field-svg"
        viewBox={`0 0 ${COLUMNS_COUNT * CELL_SIZE} ${ROWS_COUNT * CELL_SIZE}`}
      >
        {figure && figurePosition && (
          <Figure position={figurePosition} type={figure.type} />
        )}
        {!!filledDataParsed.length && (
          <FilledArea filledData={filledDataParsed} />
        )}
      </svg>
      <div className="play-field-info">
        <ControlPanel
          onLeftBtnClick={() => {
            figure && setFigurePosition(
                figure.move(EAllowedKeyCode.ArrowLeft, undefined, filledData)
              )
          }}
          onRightBtnClick={() => {
              figure && setFigurePosition(
                figure.move(EAllowedKeyCode.ArrowRight, undefined, filledData)
              )
          }}
          onRotateBtnClick={() => {
            figure && setFigurePosition(figure.rotate())
          }}
          onDownBtnClick={() => {
            figure && setFigurePosition(
              figure.move(EAllowedKeyCode.ArrowDown, undefined, filledData)
            )
        }}
      />
      </div>
    </div>
  );
};
