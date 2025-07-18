import { action } from "mobx";

import type { BaseEntity } from "../../index";

export function createPushArray<VALUE = unknown>(this: BaseEntity, fieldName: string) {
  return action((value: VALUE[]) => {
    ((this as any)[fieldName] as any[]).push(...value);
    this.setError?.(fieldName, undefined);
  });
}
