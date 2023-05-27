import { MAX_COLS, MAX_ROWS, NUMBER_OF_BOMBS } from "../constants";
import { CellValue, CellState } from "../types/index.ts";

export const generateCells = () => {
  let cells = [];

  // generate all cells
  for (let row = 0; row < MAX_ROWS; row++) {
    cells.push([]);
    for (let col = 0; col < MAX_COLS; col++) {
      cells[row].push({
        value: CellValue.none,
        state: CellState.hidden,
      });
    }
  }

  // TODO: check this while
  // randomly put X bombs
  let bombPlaced = 0;
  while (bombPlaced < NUMBER_OF_BOMBS) {
    const randomRow = Math.floor(Math.random() * MAX_ROWS);
    const randomCol = Math.floor(Math.random() * MAX_COLS);

    let currentCell = cells[randomRow][randomCol];
    if (currentCell.value !== CellValue.bomb) {
      cells[randomRow][randomCol] = {
        ...currentCell, // replacing the value property
        value: CellValue.bomb,
      };
      bombPlaced++;
    }
  }

  // calculate the numbers for each cell
  for (let rowIndex = 0; rowIndex < MAX_ROWS; rowIndex++) {
    for (let colIndex = 0; colIndex < MAX_ROWS; colIndex++) {
      const currentCell = cells[rowIndex][colIndex];
      if (currentCell.value !== CellValue.bomb) {
        // define all the cells around the current cell
        let numberOfBombs = 0;

        const neighbors = [
          [rowIndex - 1, colIndex - 1], // Top Left
          [rowIndex - 1, colIndex], // Top
          [rowIndex - 1, colIndex + 1], // Top Right
          [rowIndex, colIndex - 1], // Left
          [rowIndex, colIndex + 1], // Right
          [rowIndex + 1, colIndex - 1], // Bottom Left
          [rowIndex + 1, colIndex], // Bottom
          [rowIndex + 1, colIndex + 1], // Bottom Right
        ];

        // count the bomb around the cell
        for (let i = 0; i < neighbors.length; i++) {
          const [neighborRow, neighborCol] = neighbors[i];
          if (
            neighborRow >= 0 &&
            neighborRow < MAX_ROWS &&
            neighborCol >= 0 &&
            neighborCol < MAX_COLS
          ) {
            const neighborCell = cells[neighborRow][neighborCol];
            if (neighborCell.value === CellValue.bomb) {
              numberOfBombs++;
            }
          }
        }

        // change the value on screen
        if (numberOfBombs > 0) {
          cells[rowIndex][colIndex] = {
            ...currentCell,
            value: numberOfBombs,
          };
        }
      }
    }
  }

  return cells;
};
