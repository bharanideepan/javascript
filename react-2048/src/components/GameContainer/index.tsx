import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import {
  Box,
  IconButton,
  Typography,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

import useSettings from "../../hooks/useSettings";
import { THEMES } from "../../constants";
import { actions } from "../../slices/gridSlice";
import { RootState } from "../../store/rootReducer";
import GridView from "./GridView";
import HowToPlay from "./HowToPlay";
import Modal from "../Modal";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  score: {
    minWidth: "15vmin",
    background: theme.palette.primary.main,
    padding: "0.5vmin",
    margin: "0.75vmin",
    textAlign: "center",
    color: theme.palette.text.primary,
    flexGrow: 1,
    "& .label": {
      fontSize: "2vmin",
    },
    "& .score": {
      fontSize: "4vmin",
      fontWeight: 900,
    },
  },
}));

const GameContainer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const classes = useStyles();
  const { settings, saveSettings } = useSettings();
  const [gridSize, setGridSize] = useState(settings.gridSize);
  const { grid } = useSelector((state: RootState) => state.grid);
  const dispatch = useDispatch();
  const handleToggleTheme = () => {
    saveSettings({
      ...settings,
      theme: settings.theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT,
    });
  };
  const showModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const getConfirmation = () => {
    setConfirmModalOpen(true);
  };
  const handleSizeChange = (event: any) => {
    setGridSize(event.target.value);
    setConfirmModalOpen(true);
  };
  const closeConfirmModal = () => {
    setConfirmModalOpen(false);
    setGridSize(settings.gridSize);
  };
  const confirmRestart = () => {
    saveSettings({
      ...settings,
      gridSize,
    });
    dispatch(actions.restart());
    setConfirmModalOpen(false);
  };
  return (
    <div className={classes.root}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Box width="100%">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            my={2}
          >
            <IconButton onClick={handleToggleTheme}>
              {settings.theme === THEMES.LIGHT ? (
                <DarkModeIcon />
              ) : (
                <LightModeIcon />
              )}
            </IconButton>
            <IconButton onClick={showModal}>
              <QuestionMarkIcon />
            </IconButton>
            <IconButton onClick={getConfirmation}>
              <RestartAltIcon />
            </IconButton>
            <Box ml={"auto"}>
              <Select
                variant="standard"
                value={gridSize}
                label="size"
                onChange={handleSizeChange}
              >
                <MenuItem value={2}>2 x 2</MenuItem>
                <MenuItem value={3}>3 x 3</MenuItem>
                <MenuItem value={4}>4 x 4</MenuItem>
              </Select>
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Box className={classes.score}>
              <Typography className="label">Best tile</Typography>
              <Typography className="score">
                {grid.stats[settings.gridSize].bestTile}
              </Typography>
            </Box>
            <Box className={classes.score}>
              <Typography className="label">Score</Typography>
              <Typography className="score">{grid.score}</Typography>
            </Box>
            <Box className={classes.score}>
              <Typography className="label">High score</Typography>
              <Typography className="score">
                {grid.stats[settings.gridSize].bestScore}
              </Typography>
            </Box>
          </Box>
        </Box>
        <GridView />
      </Box>
      <Modal open={modalOpen} header="How to play?" onClose={closeModal}>
        <HowToPlay />
      </Modal>
      <Modal
        open={confirmModalOpen}
        header="Restart game?"
        onClose={closeConfirmModal}
        hideClose={true}
      >
        <Box display="flex" textAlign="center">
          <Box mr={2}>
            <Button variant="contained" color="error" onClick={confirmRestart}>
              Confirm
            </Button>
          </Box>
          <Box ml={2}>
            <Button variant="contained" onClick={closeConfirmModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default GameContainer;
