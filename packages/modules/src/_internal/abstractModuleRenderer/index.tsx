import React from "react";
import { observer } from "mobx-react-lite";

import { HookFunctionResult } from "types";
import { ErrorBoundary, ErrorComponentType } from "_internal/errorBoundary";
import { AbstractModule } from "abstractModule";

import RendererContent, { manualInstantiateAbstractModule } from "./Content";

interface AbstractModuleRendererInterface {
  module: AbstractModule;
  loadingElement?: React.ReactNode;
  ErrorComponent?: ErrorComponentType;
  onCustomBeforeInit?: () => HookFunctionResult;
  onCustomInit?: () => HookFunctionResult;
}

function AbstractModuleRendererComponent({
  module,
  loadingElement,
  ErrorComponent,
  onCustomBeforeInit,
  onCustomInit,
}: AbstractModuleRendererInterface) {
  return (
    <ErrorBoundary ErrorComponent={ErrorComponent}>
      <RendererContent
        module={module}
        loadingElement={loadingElement}
        onCustomBeforeInit={onCustomBeforeInit}
        onCustomInit={onCustomInit}
      />
    </ErrorBoundary>
  );
}

export const AbstractModuleRenderer = observer(AbstractModuleRendererComponent);

export { manualInstantiateAbstractModule };
