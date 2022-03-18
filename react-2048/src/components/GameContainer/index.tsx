import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles, useTheme } from "@mui/styles";
import { Box, IconButton } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import useSettings from "../../hooks/useSettings";
import { THEMES } from "../../constants";
import { actions } from "../../slices/gridSlice";
import GridView from "./GridView";

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
}));

const GameContainer = () => {
  const classes = useStyles();
  const { settings, saveSettings, resetSettings } = useSettings();
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
  return (
    <div className={classes.root}>
      <Box>
        <IconButton onClick={handleToggleTheme}>
          {settings.theme === THEMES.LIGHT ? (
            <LightModeIcon />
          ) : (
            <DarkModeIcon />
          )}
        </IconButton>
        <IconButton onClick={handleRestart}>
          <RestartAltIcon />
        </IconButton>
        <GridView />
      </Box>
    </div>
  );
};

export default GameContainer;
