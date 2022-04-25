import React from "react";
import "./ControlPanel.scss";
import {ArrowForwardIos, Rotate90DegreesCw} from "@mui/icons-material";

type TControlPanelProps = {
  onRightBtnClick: () => void;
  onLeftBtnClick: () => void;
  onRotateBtnClick: () => void;
  onDownBtnClick: () => void;
};

export const ControlPanel = ({
  onLeftBtnClick,
  onRightBtnClick,
  onRotateBtnClick,
  onDownBtnClick,
}: TControlPanelProps) => {
  return (
    <div className="control-panel">
      <ArrowForwardIos
        className="left-btn"
        onClick={() => onLeftBtnClick()}
        sx={{fontSize: 80}}
      />
      <Rotate90DegreesCw
        onClick={() => onRotateBtnClick()}
        sx={{fontSize: 80}}
      />
      <ArrowForwardIos
        className="right-btn"
        onClick={() => onRightBtnClick()}
        sx={{fontSize: 80}}
      />
      <ArrowForwardIos
        className="down-btn"
        onClick={() => onDownBtnClick()}
        sx={{fontSize: 80}}
      />
    </div>
  );
};
