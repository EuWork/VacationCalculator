import { dangerousGetRegistry, LoadableModule } from "@app/front-modules";
import { action, observable } from "mobx";
import React from "react";

import { LocalStorage } from "libs";

const themeLS = new LocalStorage("theme", false, "v1");

export type ThemeName = "light" | "dark";

export default class SettingsModule extends LoadableModule<any> {
  constructor() {
    super("settings");
    this.mobx();
  }

  @observable theme: ThemeName = themeLS.get() === "dark" ? "dark" : "light";
  @action setTheme = (theme: ThemeName) => {
    this.theme = theme;
    themeLS.set(theme);
  };
}

const registry = dangerousGetRegistry();
export function useSettingsModuleOrWait() {
  const [settingsModule, setSettingsModule] = React.useState(() => registry.getModuleSync<SettingsModule>("settings"));
  React.useEffect(() => {
    if (settingsModule) return;
    registry.getModuleOrLoad<SettingsModule>("settings").then(setSettingsModule);
  }, [settingsModule]);
  return settingsModule;
}
