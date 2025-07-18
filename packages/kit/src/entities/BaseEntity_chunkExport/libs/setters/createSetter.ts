import { action } from "mobx";

import type { BaseEntity } from "../../index";

export function createSetter<VALUE = unknown>(this: BaseEntity, fieldName: string) {
  return action((value: VALUE) => {
    if ((this as any)[fieldName] === value) return;
    (this as any)[fieldName] = value;
    this.setError?.(fieldName, undefined);
  });
}
