import React from "react";
import { observer } from "mobx-react-lite";

import { HookFunctionResult } from "types";
import { useDisposable } from "_internal/hooks";
import { AbstractModule, multiDisposersCall } from "abstractModule";

interface RendererContentInterface {
  module: AbstractModule;
  loadingElement: React.ReactNode;
  onCustomBeforeInit?: () => HookFunctionResult;
  onCustomInit?: () => HookFunctionResult;
}

function RendererContent({ module, loadingElement, onCustomBeforeInit, onCustomInit }: RendererContentInterface) {
  const [beforeInitCanRunNext, beforeInitError, beforeInitLoading] = useDisposable(
    true,
    module._moduleRendererOnBeforeInit
      ? // eslint-disable-next-line react-hooks/rules-of-hooks
        React.useCallback(() => module._moduleRendererOnBeforeInit(), [module])
      : undefined,
  );

  const [customBeforeInitCanRunNext, customBeforeInitError, customBeforeInitLoading] = useDisposable(
    beforeInitCanRunNext,
    // eslint-disable-next-line react-hooks/rules-of-hooks
    onCustomBeforeInit ? React.useCallback(() => onCustomBeforeInit(), [onCustomBeforeInit]) : undefined,
  );

  const [initCanRunNext, initError, initLoading] = useDisposable(
    customBeforeInitCanRunNext,
    // eslint-disable-next-line react-hooks/rules-of-hooks
    module._moduleRendererOnInit ? React.useCallback(() => module._moduleRendererOnInit(), [module]) : undefined,
  );

  const [customInitCanRunNext, customInitError, customInitLoading] = useDisposable(
    initCanRunNext,
    // eslint-disable-next-line react-hooks/rules-of-hooks
    onCustomInit ? React.useCallback(() => onCustomInit(), [onCustomInit]) : undefined,
  );

  if (beforeInitError) throw beforeInitError;
  if (customBeforeInitError) throw customBeforeInitError;
  if (initError) throw initError;
  if (customInitError) throw customInitError;

  if (!module._moduleRendererComponent) return null;
  if (beforeInitLoading || customBeforeInitLoading || initLoading || customInitLoading) return loadingElement;
  if (!customInitCanRunNext) throw new Error("Not loaded");
  return React.createElement(module._moduleRendererComponent);
}

export default observer(RendererContent);

export async function manualInstantiateAbstractModule(module: AbstractModule) {
  const onBeforeInitResult = await module._moduleRendererOnBeforeInit();
  if (onBeforeInitResult === false) return false;

  const onInitResult = await module._moduleRendererOnInit();
  if (onInitResult === false) return false;

  return multiDisposersCall(onBeforeInitResult, onInitResult);
}
