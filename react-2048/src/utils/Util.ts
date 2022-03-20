export interface Tile {
  x: number;
  y: number;
  value: number;
  key: number;
  isMergeTile?: boolean;
}

export interface Cell {
  x: number;
  y: number;
  tile?: Tile;
  mergeTile?: Tile;
}

export interface Grid {
  cells: Cell[],
  tiles: Tile[],
  score: number,
  stats: {
    2: {
      bestScore: number,
      bestTile: number
    },
    3: {
      bestScore: number,
      bestTile: number
    },
    4: {
      bestScore: number,
      bestTile: number
    }
  }
}

export const getRandomEmptyCell = (cells: Cell[]) => {
  const emptyCells = getEmptyCells(cells);
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
}

export const getEmptyCells = (cells: Cell[]) => {
  return cells.filter((cell) => cell.tile == null);
}

export const canMoveUp = (cells: Cell[]) => {
  return canMove(cellsByColumn(cells))
};
export const canMoveDown = (cells: Cell[]) => {
  return canMove(cellsByColumnReversed(cells))
};
export const canMoveLeft = (cells: Cell[]) => {
  return canMove(cellsByRow(cells))
};
export const canMoveRight = (cells: Cell[]) => {
  return canMove(cellsByRowReversed(cells))
};

export const cellsByColumnReversed = (cells: Cell[]) => {
  return cellsByColumn(cells).map((column) => [...column].reverse())
}

export const cellsByColumn = (cells: Cell[]) => {
  return cells.reduce((cellGrid: Cell[][], cell) => {
    cellGrid[cell.x] = cellGrid[cell.x] || [];
    cellGrid[cell.x][cell.y] = cell;
    return cellGrid;
  }, []);
}

export const cellsByRowReversed = (cells: Cell[]) => {
  return cellsByRow(cells).map((row) => [...row].reverse())
}

export const cellsByRow = (cells: Cell[]) => {
  return cells.reduce((cellGrid: Cell[][], cell) => {
    cellGrid[cell.y] = cellGrid[cell.y] || [];
    cellGrid[cell.y][cell.x] = cell;
    return cellGrid;
  }, []);
}

export const canMove = (cells: Cell[][]) => {
  return cells.some((group) => {
    return group.some((cell, index) => {
      if (index === 0) return false;
      if (cell.tile == null) return false;
      const moveToCell = group[index - 1];
      return canAccept(moveToCell, cell.tile);
    });
  });
};

export const canAccept = (moveToCell: Cell, tile: Tile) => {
  return (
    moveToCell.tile == null ||
    (moveToCell.mergeTile == null && moveToCell.tile.value === tile.value)
  );
}