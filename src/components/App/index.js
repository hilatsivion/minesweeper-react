import React, { useState, useEffect } from "react";
import "./App.css";
import NumberDisplay from "../NumberDispaly";
import { generateCells, openMultipleCells } from "../../utils";
import "../../styles/general.css"; // general css file
import Button from "../Button";
import { CellState, CellValue, Face } from "../../types/index.ts";

const App = () => {
  const [cells, setCells] = useState(generateCells());
  const [face, setFace] = useState(Face.smile);
  const [time, setTime] = useState(0);
  const [live, setLive] = useState(false);
  const [bombCounter, setBombCounter] = useState(10);

  // change the emoji face when mouse down
  useEffect(() => {
    const handleMouseDown = () => {
      setFace(Face.stress);
    };
    const handleMouseUp = () => {
      setFace(Face.smile);
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // executed only when time and live will changed
  useEffect(() => {
    if (live && time < 999) {
      const timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [live, time]);

  const handleCellClick = (rowParam, colParam) => {
    // start the game
    if (!live) {
      // TODO: make sure we dont click on a bomb
      setLive(true);
    }

    const currentCell = cells[rowParam][colParam];
    let newCells = cells.slice();

    if (
      currentCell.state === CellState.flagged &&
      currentCell.state === CellState.visible
    )
      return;

    if (currentCell.value == CellValue.bomb) {
      //TODO: bomb click
      console.log("bommbbbb");
    } else if (currentCell.value === CellValue.none) {
      //TODO
      newCells = openMultipleCells(cells, rowParam, colParam);
    } else {
      newCells[rowParam][colParam].state = CellState.visible;
    }
  };

  const handleCellContext = (event, rowParam, colParam) => {
    // can put flag only if the game is started
    event.preventDefault();
    if (!live) return;

    const currCells = cells.slice(); // copy of the cells
    const currentCell = cells[rowParam][colParam];

    if (currentCell === CellState.visible) {
      return;
    } else if (currentCell.state === CellState.hidden) {
      currCells[rowParam][colParam].state = CellState.flagged;
      setCells(currCells);
      setBombCounter(bombCounter - 1);
    } else if (currentCell.state === CellState.flagged) {
      currCells[rowParam][colParam].state = CellState.hidden;
      setCells(currCells);
      setBombCounter(bombCounter + 1);
    }
  };

  const handleFaceClick = () => {
    if (live) {
      setLive(false);
      setTime(0);
    }
  };

  const renderCells = () => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Button
          key={`${rowIndex}-${colIndex}`}
          state={cell.state}
          value={cell.value}
          row={rowIndex}
          col={colIndex}
          onClick={handleCellClick}
          onContext={handleCellContext}
        />
      ))
    );
  };

  return (
    <div className="app style-pop-out">
      <div className="header style-pop-in">
        <NumberDisplay value={bombCounter} />
        <div className="face style-pop-out" onClick={handleFaceClick}>
          <span role="img" aria-label="face">
            {face}
          </span>
        </div>
        <NumberDisplay value={time} />
      </div>
      <div className="body style-pop-in">{renderCells()}</div>
    </div>
  );
};

export default App;
