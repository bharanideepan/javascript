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
        default: "#f4f6f8",
        paper: common.white,
      },
      primary: {
        main: indigo[600],
      },
      secondary: {
        main: "#5850EC",
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
        default: "#1c2025",
        paper: "#282C34",
      },
      primary: {
        main: "#8a85ff",
      },
      secondary: {
        main: "#8a85ff",
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
