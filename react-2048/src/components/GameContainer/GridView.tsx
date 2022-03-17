import React, { useEffect, useCallback } from "react";
import { makeStyles } from "@mui/styles";

import { useSelector, useDispatch } from "react-redux";
import useSettings from "../../hooks/useSettings";
import CellView from "./CellView";
import TileView from "./TileView";
import { RootState } from "../../store/rootReducer";
import { actions } from "../../slices/gridSlice";
import {
  canMoveUp,
  canMoveRight,
  canMoveDown,
  canMoveLeft,
} from "../../utils/Util";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    backgroundColor: theme.palette.secondary.light,
    borderRadius: "1vmin",
    position: "relative",
  },
}));

const GridView = () => {
  const classes = useStyles();
  const { settings } = useSettings();

  const { grid } = useSelector((state: RootState) => state.grid);
  const dispatch = useDispatch();

  const handleInput = useCallback(
    (e: any) => {
      switch (e.key) {
        case "ArrowUp":
          if (!canMoveUp(grid.cells)) return;
          dispatch(actions.moveUp());
          break;
        case "ArrowDown":
          if (!canMoveDown(grid.cells)) return;
          dispatch(actions.moveDown());
          break;
        case "ArrowLeft":
          if (!canMoveLeft(grid.cells)) return;
          dispatch(actions.moveLeft());
          break;
        case "ArrowRight":
          if (!canMoveRight(grid.cells)) return;
          dispatch(actions.moveRight());
          break;
        default:
          return;
      }
      dispatch(actions.mergeCellTiles());
      dispatch(actions.addTile(1));
    },
    [grid, dispatch]
  );

  useEffect(() => {
    if (grid.cells.length === 0 && grid.tiles.length === 0) {
      dispatch(actions.createCells(settings.gridSize));
      dispatch(actions.addTile(1));
      dispatch(actions.addTile(2));
    }
  }, [settings.gridSize, grid, dispatch]);

  useEffect(() => {
    window.addEventListener("keydown", handleInput);
    return () => {
      window.removeEventListener("keydown", handleInput);
    };
  }, [grid, handleInput]);

  useEffect(() => {
    if (
      grid.cells.length > 0 &&
      grid.tiles.length > 0 &&
      !canMoveUp(grid.cells) &&
      !canMoveDown(grid.cells) &&
      !canMoveLeft(grid.cells) &&
      !canMoveRight(grid.cells)
    ) {
      console.log("you lost");
      alert("You lost");
      return;
    }
  }, [grid]);

  return (
    <div
      className={classes.root}
      style={{
        gridTemplateColumns: `repeat(${settings.gridSize}, ${settings.cellSize}vmin)`,
        gridTemplateRows: `repeat(${settings.gridSize}, ${settings.cellSize}vmin)`,
        gap: `${settings.cellGap}vmin`,
        padding: `${settings.cellGap}vmin`,
      }}
    >
      {grid &&
        grid.cells.map((cell, i) => {
          return <CellView key={i} />;
        })}
      {grid &&
        grid.tiles.map((tile, i) => {
          return (
            <TileView key={tile.key} x={tile.x} y={tile.y} value={tile.value} />
          );
        })}
    </div>
  );
};

export default GridView;
