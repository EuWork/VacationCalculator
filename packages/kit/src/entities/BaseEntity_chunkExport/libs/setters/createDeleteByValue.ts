import { action } from "mobx";

import type { BaseEntity } from "../../index";

export function createDeleteByValue<VALUE = unknown>(this: BaseEntity, fieldName: string) {
  return action((value: VALUE) => {
    const index = ((this as any)[fieldName] as any[]).indexOf(value);
    if (index === -1) return;
    ((this as any)[fieldName] as any[]).splice(index, 1);
  });
}
