import { action } from "mobx";

import type { BaseEntity } from "../../index";

export function createSetterArrayObservable<VALUE = unknown>(this: BaseEntity, fieldName: string) {
  return action((value: VALUE[]) => {
    const original = (this as any)[fieldName] as any[];
    if (original === value) return;
    original.splice(0, original.length, ...value);
    this.setError?.(fieldName, undefined);
  });
}
