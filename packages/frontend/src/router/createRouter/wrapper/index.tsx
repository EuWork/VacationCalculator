import React from "react";
import { observer } from "mobx-react-lite";
import { UiProvider } from "@app/ui";

import { useSettingsModuleOrWait } from "modules/settings";

import { darkTheme, lightTheme } from "theme";
import CommonLibsProvider from "pages-common/common-libs-provider";

import BackgroundColorFill from "./BackgroundColorFill";

import "./style.css";

interface PageWrapperInterface {
  children: React.ReactNode;
}

function PageWrapper({ children }: PageWrapperInterface) {
  const settingsModule = useSettingsModuleOrWait();
  if (!settingsModule) return null;

  const theme = settingsModule.theme === "light" ? lightTheme : darkTheme;

  return (
    <UiProvider theme={theme} themeName={settingsModule.theme} globalWindow={window}>
      <BackgroundColorFill />
      <CommonLibsProvider>{children}</CommonLibsProvider>
    </UiProvider>
  );
}

export default observer(PageWrapper);
