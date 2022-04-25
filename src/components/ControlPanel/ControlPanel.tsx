import React from "react";
import "./ControlPanel.scss";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Rotate90DegreesCw,
} from "@mui/icons-material";

type TControlPanelProps = {
  onRightBtnClick: () => void;
  onLeftBtnClick: () => void;
  onRotateBtnClick: () => void;
};

export const ControlPanel = ({
  onLeftBtnClick,
  onRightBtnClick,
  onRotateBtnClick,
}: TControlPanelProps) => {
  return (
    <div className="control-panel">
      <ArrowBackIos onClick={() => onLeftBtnClick()} sx={{fontSize: 80}} />
      <Rotate90DegreesCw
        onClick={() => onRotateBtnClick()}
        sx={{fontSize: 80}}
      />
      <ArrowForwardIos onClick={() => onRightBtnClick()} sx={{fontSize: 80}} />
    </div>
  );
};
