import { action } from "mobx";

import type { BaseEntity } from "../../index";

export function createUpdateByIndex<VALUE = unknown>(this: BaseEntity, fieldName: string) {
  return action((index: number, value: VALUE) => {
    ((this as any)[fieldName] as any[])[index] = value;
    this.setError?.(fieldName, undefined);
  });
}
