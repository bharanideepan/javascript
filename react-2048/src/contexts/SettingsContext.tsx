import React, { createContext, useState } from "react";
import _ from "lodash";
import { THEMES } from "../constants";

interface Settings {
  theme: string;
  gridSize: number;
  cellSize: number;
  cellGap: number;
}

const DEFAULT_SETTINGS: Settings = {
  theme: THEMES.LIGHT,
  gridSize: 4,
  cellSize: 15,
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
