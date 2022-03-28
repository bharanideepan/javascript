import React from "react";
import { makeStyles } from "@mui/styles";
import useSettings from "../../hooks/useSettings";
import { THEMES } from "../../constants";

const getColors = (theme: string, value: number) => {
  const power = Math.log2(value);
  const lightness = 100 - power * 9;
  if (theme === THEMES.LIGHT) {
    return {
      backgroundColor: `hsl(182, 50%, ${lightness}%)`,
      color: `hsl(182, 25%, ${lightness <= 50 ? 90 : 10}%)`,
    };
  } else {
    return {
      backgroundColor: `hsl(200, 19%, ${lightness}%)`,
      color: `hsl(200, 19%, ${lightness <= 50 ? 90 : 10}%)`,
    };
  }
};

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
    boxShadow: "0px 0px 44px rgb(51 51 51 / 35%)",
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
  const colors = getColors(settings.theme, value);
  return (
    <div
      className={classes.tile}
      style={{
        width: `${settings.cellSize}vmin`,
        height: `${settings.cellSize}vmin`,
        top: `${
          y * (settings.cellSize + settings.cellGap) + settings.cellGap * 1.5
        }vmin`,
        left: `${
          x * (settings.cellSize + settings.cellGap) + settings.cellGap * 1.5
        }vmin`,
        backgroundColor: colors.backgroundColor,
        color: colors.color,
      }}
    >
      {value}
    </div>
  );
};

export default TileView;
