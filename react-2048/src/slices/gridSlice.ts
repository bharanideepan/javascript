import { createSlice } from "@reduxjs/toolkit";
import {
  Grid, Cell, Tile,
  getRandomEmptyCell,
  cellsByColumn,
  cellsByColumnReversed,
  cellsByRow, cellsByRowReversed, canAccept
} from "../utils/Util";

const KEY = 'gameData';
const DEFAULT = {
  cells: [],
  tiles: [],
  score: 0,
  highScore: 0
}
const resumeGame = (): Grid => {
  let grid: Grid = DEFAULT;
  try {
    const storedData = window.localStorage.getItem(KEY);
    if (storedData) {
      grid = JSON.parse(storedData);
    }
  } catch (err) {
    console.error(err);
  }
  return grid;
};

const storeGameData = (gameData: Grid) => {
  window.localStorage.setItem(KEY, JSON.stringify(gameData));
}

const initialState: { grid: Grid } = {
  grid: resumeGame()
};

const slice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    restart(state) {
      state.grid = { ...DEFAULT, highScore: state.grid.highScore };
    },
    createCells(state, action) {
      const size = action.payload;
      const cells: Cell[] = [];
      for (let i = 0; i < size * size; i++) {
        const cell: Cell = {
          x: i % size,
          y: Math.floor(i / size)
        }
        cells.push(cell);
      }
      state.grid.cells = cells;
    },
    addTile(state, action) {
      const emptyCell = getRandomEmptyCell(state.grid.cells);
      emptyCell.tile = {
        x: emptyCell.x,
        y: emptyCell.y,
        value: Math.random() > 0.5 ? 2 : 4,
        key: new Date().getTime() + action.payload
      }
      state.grid.tiles.push(emptyCell.tile)
      storeGameData(state.grid);
    },
    moveUp(state) {
      slideTiles(state.grid.tiles, cellsByColumn(state.grid.cells))
    },
    moveDown(state) {
      slideTiles(state.grid.tiles, cellsByColumnReversed(state.grid.cells))
    },
    moveLeft(state) {
      slideTiles(state.grid.tiles, cellsByRow(state.grid.cells))
    },
    moveRight(state) {
      slideTiles(state.grid.tiles, cellsByRowReversed(state.grid.cells))
    },
    mergeCellTiles(state) {
      mergeCellTiles(state.grid)
    }
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;

export default slice;

const slideTiles = (tiles: Tile[], cells: Cell[][]) => {
  cells.forEach((group) => {
    for (let i = 0; i < group.length; i++) {
      const cell = group[i];
      if (cell.tile == null) continue;
      let lastValidCell;
      for (let j = i - 1; j >= 0; j--) {
        const moveToCell = group[j];
        if (!canAccept(moveToCell, cell.tile)) break;
        lastValidCell = moveToCell;
      }
      if (lastValidCell != null) {
        const tileToMove = tiles.find(tile => {
          return cell.tile && (tile.x === cell.tile.x && tile.y === cell.tile.y)
        })
        if (lastValidCell.tile != null) {
          lastValidCell.mergeTile = cell.tile;
          lastValidCell.mergeTile.x = lastValidCell.x;
          lastValidCell.mergeTile.y = lastValidCell.y;
          if (tileToMove) tileToMove.isMergeTile = true;
        } else {
          lastValidCell.tile = cell.tile;
          lastValidCell.tile.x = lastValidCell.x;
          lastValidCell.tile.y = lastValidCell.y;
        }
        if (tileToMove) {
          tileToMove.x = lastValidCell.x;
          tileToMove.y = lastValidCell.y;
        }
        delete cell.tile
      }
    }
  });
}

const mergeCellTiles = (grid: Grid) => {
  grid.tiles = grid.tiles.filter(tile => !tile.isMergeTile)
  grid.cells.forEach(cell => {
    const tile = grid.tiles.find(tile => cell.x === tile.x && cell.y === tile.y)
    if (cell.tile && cell.mergeTile && cell.tile.value && cell.mergeTile.value) {
      cell.tile.value =
        cell.tile.value + cell.mergeTile.value;
      setScore(grid, cell.tile.value);
      delete cell.mergeTile;
    }
    if (tile && cell.tile) {
      tile.value = cell.tile.value
    }
  })
}

const setScore = (grid: Grid, newScore: number) => {
  grid.score = grid.score + newScore
  if (grid.highScore <= grid.score) {
    grid.highScore = grid.score
  }
}