import React, { createContext, useState } from "react";
import _ from "lodash";
import { THEMES } from "../constants";

interface Settings {
  theme: string;
  gridSize: 2 | 3 | 4 | 5;
  cellSize: 12 | 16;
  cellGap: number;
}

const DEFAULT_SETTINGS: Settings = {
  theme: THEMES.DARK,
  gridSize: 4,
  cellSize: 16,
  cellGap: 1.5,
};

const restoreSettings = (): Settings => {
  let settings: Settings = DEFAULT_SETTINGS;
  try {
    const storedData = window.localStorage.getItem("config");
    if (storedData) {
      settings = JSON.parse(storedData);
    }
  } catch (err) {
    console.error(err);
  }
  return settings;
};

const storeSettings = (settings: Settings) => {
  window.localStorage.setItem("config", JSON.stringify(settings));
};

const SettingsContext = createContext({
  settings: DEFAULT_SETTINGS,
  saveSettings: (settings: Settings) => {},
  resetSettings: () => {},
});

export const SettingsProvider: React.FC<{
  settings?: Settings;
}> = ({ settings, children }) => {
  const [currentSettings, setCurrentSettings] = useState<Settings>(
    settings || restoreSettings()
  );

  const handleSaveSettings = (update: Settings = DEFAULT_SETTINGS) => {
    const mergedSettings = _.merge({}, currentSettings, update);
    mergedSettings.cellSize = mergedSettings.gridSize > 4 ? 12 : 16;
    setCurrentSettings(mergedSettings);
    storeSettings(mergedSettings);
  };

  const resetSettings = () => {
    setCurrentSettings(DEFAULT_SETTINGS);
    storeSettings(DEFAULT_SETTINGS);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings: currentSettings,
        saveSettings: handleSaveSettings,
        resetSettings: resetSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
