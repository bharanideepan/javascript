import React from "react";
import { ThemeProvider } from "@mui/styles";

import useSettings from "./hooks/useSettings";
import GlobalStyles from "./components/GlobalStyles";
import { createTheme } from "./theme";
import GameContainer from "./components/GameContainer";

const App = () => {
  const { settings } = useSettings();
  const theme = createTheme({
    theme: settings.theme,
  });
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <GameContainer />
    </ThemeProvider>
  );
};

export default App;
