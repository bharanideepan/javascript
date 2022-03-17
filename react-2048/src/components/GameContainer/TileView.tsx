import React from "react";
import { makeStyles } from "@mui/styles";
import useSettings from "../../hooks/useSettings";

const useStyles = makeStyles((theme) => ({
  tile: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "1vmin",
    fontWeight: "bold",
    fontSize: "5vmin",
    animation: "$show 200ms ease-in-out",
    transition: "100ms ease-in-out",
  },
  "@keyframes show": {
    "0%": {
      opacity: 0.5,
      transform: "scale(0)",
    },
  },
}));

const TileView: React.FC<{ x: number; y: number; value: number }> = ({
  x,
  y,
  value,
}) => {
  const classes = useStyles();
  const { settings } = useSettings();
  const power = Math.log2(value);
  const lightness = 100 - power * 9;
  return (
    <div
      className={classes.tile}
      style={{
        width: `${settings.cellSize}vmin`,
        height: `${settings.cellSize}vmin`,
        top: `${
          y * (settings.cellSize + settings.cellGap) + settings.cellGap
        }vmin`,
        left: `${
          x * (settings.cellSize + settings.cellGap) + settings.cellGap
        }vmin`,
        backgroundColor: `hsl(197, 70%, ${lightness}%`,
        color: `hsl(197, 70%, ${lightness <= 50 ? 90 : 10}%`,
      }}
    >
      {value}
    </div>
  );
};

export default TileView;
