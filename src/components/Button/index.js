import React from "react";
import "./Button.css";
import "../../styles/general.css"; // general css file
import { CellState, CellValue } from "../../types/index.ts";

const button = ({ row, col, value, state }) => {
  const renderContent = () => {
    if (state === CellState.visible) {
      if (value === CellValue.bomb) {
        return (
          <span role="img" aria-label="bomb">
            💣
          </span>
        );
      } else if (value === CellValue.none) return null;

      return value; // return a number of bombs around
    } else if (state === CellState.flagged) {
      return (
        <span role="img" aria-label="flag">
          🚩
        </span>
      );
    }
    return null;
  };

  return (
    <div
      className={`button style-pop-out ${
        state === CellState.visible ? "visible" : ""
      } value-${value}`}
    >
      {renderContent()}
    </div>
  );
};

export default button;
