import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  cell: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: "1vmin",
  },
}));

const CellView = () => {
  const classes = useStyles();
  return <div className={classes.cell}></div>;
};

export default CellView;
