import React from "react";
import { makeStyles } from "@mui/styles";

import useSettings from "../../hooks/useSettings";
import GridView from "./GridView";
import { Button } from "@mui/material";

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
  const { resetSettings } = useSettings();
  const handleClick = () => {
    resetSettings();
  };
  return (
    <div className={classes.root}>
      <GridView />
      {/* <Button variant="contained" color="primary" onClick={handleClick}>
        Reset settings
      </Button> */}
    </div>
  );
};

export default GameContainer;
