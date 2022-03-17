import React from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";

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
      <div>
        <Button variant="contained" color="primary" onClick={handleToggleTheme}>
          Toggle Theme
        </Button>
        <Button variant="contained" color="primary" onClick={handleRestart}>
          Restart
        </Button>
        <GridView />
      </div>
    </div>
  );
};

export default GameContainer;
