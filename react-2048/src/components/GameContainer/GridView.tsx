import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSwipeable } from "react-swipeable";
import { makeStyles } from "@mui/styles";
import { Button, Box } from "@mui/material";
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
import Modal from "../Modal";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    backgroundColor: theme.palette.secondary.light,
    borderRadius: "1vmin",
    position: "relative",
    width: "fit-content",
  },
}));

const GridView = () => {
  const classes = useStyles();
  const { settings } = useSettings();
  const [modalOpen, setModalOpen] = useState(false);
  const { grid } = useSelector((state: RootState) => state.grid);
  const dispatch = useDispatch();
  const handlers = useSwipeable({
    onSwipedLeft: () => handleInput({ key: "ArrowLeft" }),
    onSwipedRight: () => handleInput({ key: "ArrowRight" }),
    onSwipedUp: () => handleInput({ key: "ArrowUp" }),
    onSwipedDown: () => handleInput({ key: "ArrowDown" }),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const showModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    dispatch(actions.restart());
  };

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
      dispatch(actions.mergeCellTiles(settings.gridSize));
      dispatch(actions.addTile(1));
    },
    [settings.gridSize, grid, dispatch]
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
      showModal();
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
      {...handlers}
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
      <Modal
        open={modalOpen}
        header="Game over"
        onClose={closeModal}
        hideClose={true}
      >
        <Box textAlign="center">
          <Button variant="contained" onClick={closeModal}>
            New game
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default GridView;
