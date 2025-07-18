import { action } from "mobx";

import type { BaseEntity } from "../../index";

export function createToggle(this: BaseEntity, fieldName: string) {
  return action(() => {
    (this as any)[fieldName] = !(this as any)[fieldName];
    this.setError?.(fieldName, undefined);
  });
}
