import React, { useState } from "react";
import "./App.css";
import NumberDisplay from "../NumberDispaly";
import { generateCells } from "../../utils";
import "../../styles/general.css"; // general css file
import Button from "../Button";

const App = () => {
  const [cells, setCells] = useState(generateCells());

  const renderCells = () => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => <Button />)
    );
  };

  return (
    <div className="app style-pop-out">
      <div className="header style-pop-in">
        <NumberDisplay value={0} />
        <div className="face style-pop-out">
          <span role="img" aria-label="face">
            😃
          </span>
        </div>
        <NumberDisplay value={50} />
      </div>
      <div className="body style-pop-in">{renderCells()}</div>
    </div>
  );
};

export default App;
