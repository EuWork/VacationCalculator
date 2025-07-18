import { action } from "mobx";

import type { BaseEntity } from "../../index";
import React from "react";

export function createSetterEvent(this: BaseEntity, fieldName: string) {
  const setter = this.createSetter(fieldName);
  return action((event: React.SyntheticEvent) => setter((event.target as any).value));
}
