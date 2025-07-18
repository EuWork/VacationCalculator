import { deepObserve } from "mobx-utils";
import { observe } from "mobx";
import debounce from "lodash.debounce";

import type { BaseEntity } from "../../index";

function registerOnFieldChangeCallback(
  this: BaseEntity,
  callback: (value: any) => void,
  fieldName: string,
  deep = false,
  certainField = false,
) {
  if (deep) return deepObserve((this as any)[fieldName], callback);
  if (certainField) return observe((this as any)[fieldName], callback);
  return observe(this as any, fieldName, callback);
}

function createDisposableDebouncedCallback(callback: (...args: any[]) => void, debounceTime: number) {
  let disposed = false;
  const debouncedCallback = debounce((...args: any[]) => !disposed && callback(...args), debounceTime);
  return {
    debouncedCallback,
    disposeCallback: () => void (disposed = true),
  };
}

export function onFieldChange(
  this: BaseEntity,
  callback: (value: any) => void,
  fieldName: string,
  debounceTime: number,
  deep?: boolean,
  certainField?: boolean,
) {
  const { disposeCallback, debouncedCallback } = createDisposableDebouncedCallback(callback, debounceTime);
  const dispose = registerOnFieldChangeCallback.call(this, debouncedCallback, fieldName, deep, certainField);
  return () => {
    disposeCallback();
    dispose();
  };
}

export function onMultipleFieldChange(
  this: BaseEntity,
  callback: () => void,
  fieldNames: string[],
  debounceTime: number,
  deep?: boolean,
  certainField?: boolean,
) {
  const { disposeCallback, debouncedCallback } = createDisposableDebouncedCallback(callback, debounceTime);
  const disposers = fieldNames.map((fieldName) =>
    registerOnFieldChangeCallback.call(this, debouncedCallback, fieldName, deep, certainField),
  );
  return () => {
    disposeCallback();
    disposers.forEach((dispose) => dispose());
  };
}
