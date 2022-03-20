import React, { useState, useEffect, useCallback } from "react";
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
import Modal from "../Modal";
import { Button, Box } from "@mui/material";

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
  const [xDown, setXDown] = useState(0);
  const [yDown, setYDown] = useState(0);
  const { grid } = useSelector((state: RootState) => state.grid);
  const dispatch = useDispatch();

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
      dispatch(actions.mergeCellTiles());
      dispatch(actions.addTile(1));
    },
    [grid, dispatch]
  );

  const getTouches = useCallback((event: any) => {
    return (
      event.touches || // browser API
      event.originalEvent.touches
    ); // jQuery
  }, []);
  const handleTouchStart = useCallback(
    (event: any) => {
      const firstTouch = getTouches(event)[0];
      setXDown(firstTouch.clientX);
      setYDown(firstTouch.clientY);
    },
    [getTouches, setXDown, setYDown]
  );
  const handleTouchMove = useCallback(
    (event: any) => {
      if (!xDown || !yDown) {
        return;
      }
      const xUp = event.touches[0].clientX;
      const yUp = event.touches[0].clientY;
      const xDiff = xDown - xUp;
      const yDiff = yDown - yUp;
      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        /*most significant*/
        if (xDiff > 0) {
          handleInput({ key: "ArrowLeft" });
        } else {
          handleInput({ key: "ArrowRight" });
        }
      } else {
        if (yDiff > 0) {
          handleInput({ key: "ArrowUp" });
        } else {
          handleInput({ key: "ArrowDown" });
        }
      }
      /* reset values */
      setXDown(0);
      setYDown(0);
    },
    [handleInput, xDown, yDown, setXDown, setYDown]
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
    document.addEventListener("touchstart", handleTouchStart, false);
    document.addEventListener("touchmove", handleTouchMove, false);
    return () => {
      window.removeEventListener("keydown", handleInput);
      document.removeEventListener("touchstart", handleTouchStart, false);
      document.removeEventListener("touchmove", handleTouchMove, false);
    };
  }, [grid, handleInput, handleTouchStart, handleTouchMove]);

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
