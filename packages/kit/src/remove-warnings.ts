export function removeMobXArrayLengthWarnings() {
  makeIgnoringWarn(["[mobx] Out of bounds read:", "[mobx.array] Attempt to read an array index"]);
}

export function removeResizeObserverLoopLimitExceeded() {
  patchOnError(["ResizeObserver loop limit exceeded"]);
}

export function removeReactFindDomNode() {
  makeIgnoringError(["findDOMNode is deprecated"]);
}

export function removeReactRenderUpdateWarning() {
  makeIgnoringError([") while rendering a different component ("]);
}

export function removeAntWarning() {
  makeIgnoringError(["Warning: [antd: Table]", "Warning: `value` in Select options should not be `null`"]);
}

function makeIgnoring(ignorePatterns: string[], originalFunc: Function) {
  return (...args: any[]) => {
    const texts = args.map((arg) => arg.toString()).join("");
    const found = ignorePatterns.find((pattern) => texts.includes(pattern));
    if (found) return;
    originalFunc(...args);
  };
}

function makeIgnoringWarn(ignorePatterns: string[]) {
  console.warn = makeIgnoring(ignorePatterns, console.warn);
}

function makeIgnoringError(ignorePatterns: string[]) {
  console.error = makeIgnoring(ignorePatterns, console.error);
}

function patchOnError(ignorePatterns: string[]) {
  const onError = window.onerror as Function | undefined;
  window.onerror = function (err) {
    if (ignorePatterns.includes(err as string)) return false;
    // eslint-disable-next-line prefer-rest-params
    return onError?.(...arguments);
  };
}
