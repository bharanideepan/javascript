import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  cell: {
    backgroundColor: "hsl(200, 25%, 50%)",
    borderRadius: "1vmin",
  },
}));

const CellView = () => {
  const classes = useStyles();
  return <div className={classes.cell}></div>;
};

export default CellView;
