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
  button: string;
}

const baseOptions = {};

const themesOptions: CustomThemeOptions[] = [
  {
    name: THEMES.LIGHT,
    button: '',
    palette: {
      mode: "light",
      background: {
        default: "#eceff1", // body bg
      },
      primary: {
        main: '#795548',
        light: '#795548'
      },
      secondary: {
        main: "#608a9f", // cell bg
        light: "#609d9f", // board bg
      },
    },
  },
  {
    name: THEMES.DARK,
    button: '',
    palette: {
      mode: "dark",
      background: {
        default: "#5D636A",
      },
      primary: {
        main: "#795548",
      },
      secondary: {
        main: "#000000",
        light: "#212327"
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
