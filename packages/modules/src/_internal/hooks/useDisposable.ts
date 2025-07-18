import React from "react";
import { useAsyncFn, useSyncToRef } from "@worksolutions/react-utils";
import { isFunction } from "@worksolutions/utils";

import { HookFunctionResult, HookFunctionResultDispose, HookFunctionResultValue } from "types";

export function useDisposable(canRun: boolean, handler: (() => HookFunctionResult) | undefined) {
  const promisedHandler = React.useCallback(async () => handler?.(), [handler]);
  const [{ loading, error, value }, asyncHandler] = useAsyncFn(promisedHandler, [promisedHandler], {
    loading: !!handler,
  });

  const handlerRef = useSyncToRef(handler);
  React.useEffect(() => {
    if (!canRun || !handlerRef.current) return;
    const disposer = createDisposeContainer();
    asyncHandler().then((result) => disposer.promiseThen(result));
    return disposer.reactComponentDispose;
  }, [asyncHandler, canRun, handlerRef]);

  const canRunNextHook = (function () {
    if (!canRun) return false;
    if (loading) return false;
    if (error) return false;
    if (value === false) return false;
    return true;
  })();

  return [canRunNextHook, error, loading] as const;
}

function createDisposeContainer() {
  const disposer: { unmounted: boolean; disposeHandler: HookFunctionResultDispose | void | undefined } = {
    unmounted: false,
    disposeHandler: undefined,
  };

  function reactComponentDispose() {
    disposer.disposeHandler?.();
    disposer.unmounted = true;
  }

  function promiseThen(result: HookFunctionResultValue | undefined) {
    disposer.disposeHandler = isFunction(result) ? result : undefined;
    if (disposer.unmounted) disposer.disposeHandler?.();
  }

  return { reactComponentDispose, promiseThen };
}
