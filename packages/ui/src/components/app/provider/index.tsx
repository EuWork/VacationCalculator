import React from "react";
import { ConfigProvider, Layout } from "antd";

import { Theme } from "theme";
import { ScrollProviderContext } from "components/ScrollProvider";

import NotificationsContainer from "../notifications_chunkExport/_system/container";

import { layoutStyles } from "./style.css";

interface UiProviderInterface {
  children: React.ReactNode;
  themeName: string;
  theme: Theme;
  globalWindow: Window;
}

function UiProviderComponent({ children, themeName, theme, globalWindow }: UiProviderInterface) {
  const themeClassName = React.useMemo(() => {
    if (typeof window === "undefined") return;
    const themeClass = "ant-theme-" + themeName;
    document.documentElement.classList.add(themeClass);
    return themeClass;
  }, [themeName]);
  React.useEffect(
    () => () => {
      if (themeClassName) document.documentElement.classList.remove(themeClassName);
    },
    [themeClassName],
  );

  return (
    <ScrollProviderContext.Provider value={{ scrollableElement: globalWindow, wrapperElement: globalWindow }}>
      <ConfigProvider theme={theme}>
        <Layout className={layoutStyles} hasSider>
          {children}
          <NotificationsContainer />
        </Layout>
      </ConfigProvider>
    </ScrollProviderContext.Provider>
  );
}

export const UiProvider = React.memo(UiProviderComponent);
