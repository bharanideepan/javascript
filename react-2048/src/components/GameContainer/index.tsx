import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { Box, IconButton, Typography, Dialog } from "@mui/material";
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
    margin: "0.5vmin",
    border: `0.2vmin solid ${theme.palette.secondary.light}`,
    borderRadius: "0.5vmin",
    textAlign: "center",
    color: theme.palette.text.primary,
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
  const classes = useStyles();
  const { settings, saveSettings, resetSettings } = useSettings();
  const { grid } = useSelector((state: RootState) => state.grid);
  const dispatch = useDispatch();
  const handleRestart = () => {
    dispatch(actions.restart());
  };
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
  return (
    <div className={classes.root}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
        height="100%"
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <IconButton onClick={handleToggleTheme}>
            {settings.theme === THEMES.LIGHT ? (
              <LightModeIcon />
            ) : (
              <DarkModeIcon />
            )}
          </IconButton>
          <IconButton onClick={showModal}>
            <QuestionMarkIcon />
          </IconButton>
          <IconButton onClick={handleRestart}>
            <RestartAltIcon />
          </IconButton>
          <Box className={classes.score}>
            <Typography className="label">Score</Typography>
            <Typography className="score">{grid.score}</Typography>
          </Box>
          <Box className={classes.score}>
            <Typography className="label">High score</Typography>
            <Typography className="score">{grid.highScore}</Typography>
          </Box>
        </Box>
        <GridView />
      </Box>
      <Modal open={modalOpen} header="How to play?" onClose={closeModal}>
        <HowToPlay />
      </Modal>
    </div>
  );
};

export default GameContainer;
