import { action } from "mobx";

import type { BaseEntity } from "../../index";

export function createReoder(this: BaseEntity, fieldName: string, idFieldName: string) {
  return action((newOrder: string[]) => {
    const field = (this as any)[fieldName] as any[];
    ((this as any)[fieldName] as any[]) = newOrder.map(
      (id) => field.find((fieldValue) => fieldValue[idFieldName] === id)!,
    );
    this.setError?.(fieldName, undefined);
  });
}
