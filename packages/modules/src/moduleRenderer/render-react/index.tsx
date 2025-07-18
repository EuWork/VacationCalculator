import React from "react";
import { useSyncToRef } from "@worksolutions/react-utils";
import { observer } from "mobx-react-lite";

import { HookFunctionResult } from "types";
import { ErrorComponentType } from "_internal/errorBoundary";
import { AbstractModuleRenderer } from "_internal/abstractModuleRenderer";
import { ReactLoadableModule, ReactLoadableModuleAsync } from "reactLoadableModule";

export type BaseModule<PROPS extends object> = ReactLoadableModule<ReactLoadableModuleAsync<PROPS>>;

type RenderReactLoadableModuleInterface<MODULE extends BaseModule<{}>> = {
  module: MODULE;
  ErrorComponent?: ErrorComponentType | undefined;
  loadingElement?: React.ReactNode;
  onCustomBeforeInit?: (module: MODULE) => HookFunctionResult;
  onCustomInit?: (module: MODULE) => HookFunctionResult;
} & (MODULE extends ReactLoadableModule<ReactLoadableModuleAsync<infer PROPS>> ? PROPS : {});

function RenderReactLoadableModule<MODULE extends BaseModule<{}>>({
  module,
  ErrorComponent,
  loadingElement,
  onCustomBeforeInit,
  onCustomInit,
  ...props
}: RenderReactLoadableModuleInterface<MODULE>) {
  const moduleRef = React.useRef(module);

  const initialized = React.useRef(false);
  const propsSyncRef = useSyncToRef(props);
  const propsKeys = Object.keys(props);
  const propsValue = Object.values(props);
  React.useMemo(
    () => {
      const module = moduleRef.current.loadedModule;
      module?._setProps(propsSyncRef.current);
      if (initialized.current) module?.onPropsUpdated?.();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...propsKeys, ...propsValue],
  );

  const handleCustomBeforeInit = React.useCallback(() => {
    const module = moduleRef.current.loadedModule;
    module._setProps(propsSyncRef.current);
    onCustomBeforeInit?.(moduleRef.current);
  }, [onCustomBeforeInit, propsSyncRef]);

  const handleCustomInit = React.useCallback(() => {
    initialized.current = true;
    const module = moduleRef.current.loadedModule;
    module.onPropsUpdated?.();
    onCustomInit?.(moduleRef.current);
  }, [onCustomInit]);

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

export default observer(RenderReactLoadableModule);
