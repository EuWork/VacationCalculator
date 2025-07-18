import React from "react";
import { AbstractModule, RenderModule } from "@app/front-modules";
import { createBrowserRouter } from "react-router-dom";

import SettingsModule from "modules/settings";

import CommonLibsProvider from "pages-common/common-libs-provider";

interface CommonModulesInterface {
  router: ReturnType<typeof createBrowserRouter>;
}

function CommonModulesComponent({ router }: CommonModulesInterface) {
  const handleCustomBeforeInit = React.useCallback(
    async (module: AbstractModule) => {
      await module.loadExternalModule("native-router", { data: router });
    },
    [router],
  );

  return (
    <CommonLibsProvider>
      <RenderModule Module={SettingsModule} onCustomBeforeInit={handleCustomBeforeInit} />
    </CommonLibsProvider>
  );
}

export const CommonModules = React.memo(CommonModulesComponent);
