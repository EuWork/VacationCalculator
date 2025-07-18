import { action } from "mobx";

import type { BaseEntity } from "../../index";

export function createDeleteByIndex(this: BaseEntity, fieldName: string) {
  return action((index: number) => {
    ((this as any)[fieldName] as any[]).splice(index, 1);
  });
}
