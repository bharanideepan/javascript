import _ from "lodash";
import {
  createTheme as createMuiTheme,
  responsiveFontSizes,
  ThemeOptions,
} from "@mui/material/styles";
import { blueGrey, indigo, common } from "@mui/material/colors";
import { THEMES } from "../constants";

interface CustomThemeOptions extends ThemeOptions {
  name: string;
}

const baseOptions = {};

const themesOptions: CustomThemeOptions[] = [
  {
    name: THEMES.LIGHT,
    palette: {
      mode: "light",
      background: {
        default: "#B8CDDD", // body bg
      },
      primary: {
        main: indigo[600],
      },
      secondary: {
        main: "#0D638C", // cell bg
        light: "#4D7391", // board bg
      },
      text: {
        primary: blueGrey[900],
        secondary: blueGrey[600],
      },
    },
  },
  {
    name: THEMES.DARK,
    palette: {
      mode: "dark",
      background: {
        default: "#5D636A",
      },
      primary: {
        main: "#8a85ff",
      },
      secondary: {
        main: "#000000",
        light: "#212327"
      },
      text: {
        primary: "#e6e5e8",
        secondary: "#adb0bb",
      },
    },
  },
];

export const createTheme = (config: any = {}) => {
  let themeOptions = themesOptions.find((theme) => theme.name === config.theme);

  if (!themeOptions) {
    console.warn(new Error(`The theme ${config.theme} is not valid`));
    [themeOptions] = themesOptions;
  }

  let theme = createMuiTheme(_.merge({}, baseOptions, themeOptions));

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};
