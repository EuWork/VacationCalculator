import React from "react";
import { observer } from "mobx-react-lite";

import { HookFunctionResult } from "types";
import { ErrorComponentType } from "_internal/errorBoundary";
import { AbstractModuleRenderer } from "_internal/abstractModuleRenderer";
import { AbstractModule } from "abstractModule";
import { LoadableModule } from "loadableModule";

type BaseModule = LoadableModule<AbstractModule> | AbstractModule;

type RenderLoadableOrAbstractModuleInterface<MODULE extends BaseModule> = {
  module: MODULE;
  ErrorComponent?: ErrorComponentType | undefined;
  loadingElement?: React.ReactNode;
  onCustomBeforeInit?: (module: MODULE) => HookFunctionResult;
  onCustomInit?: (module: MODULE) => HookFunctionResult;
};

function RenderLoadableOrAbstractModule<MODULE extends BaseModule>({
  module,
  ErrorComponent,
  loadingElement,
  onCustomBeforeInit,
  onCustomInit,
}: RenderLoadableOrAbstractModuleInterface<MODULE>) {
  const handleCustomBeforeInit = React.useMemo(
    () => (onCustomBeforeInit ? () => onCustomBeforeInit(module) : undefined),
    [module, onCustomBeforeInit],
  );

  const handleCustomInit = React.useMemo(
    () => (onCustomInit ? () => onCustomInit(module) : undefined),
    [module, onCustomInit],
  );

  return (
    <AbstractModuleRenderer
      module={module}
      ErrorComponent={ErrorComponent}
      loadingElement={loadingElement}
      onCustomBeforeInit={handleCustomBeforeInit}
      onCustomInit={handleCustomInit}
    />
  );
}

export default observer(RenderLoadableOrAbstractModule);
