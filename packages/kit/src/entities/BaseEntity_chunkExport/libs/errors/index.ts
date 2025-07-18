import { path, splitByPoint } from "@worksolutions/utils";

import type { BaseEntity } from "../../index";

export function getViewErrors(this: BaseEntity): Record<string, string | undefined> {
  const submitted = this.submitted;
  const forceShowErrorKeys = this.forceShowErrorKeys;
  return Object.fromEntries(
    Object.entries(this.errors)
      .map(([key, value]) => (submitted || (forceShowErrorKeys as any)[key] ? [key, value] : null!))
      .filter((error) => error),
  );
}

export function setError(this: BaseEntity, fieldName: string, error: string | undefined, forceShow = false) {
  const fieldNameArray = splitByPoint(fieldName);
  const prePathEntity = path(fieldNameArray.slice(0, -1), this) as BaseEntity;
  const resultFieldName = fieldNameArray[fieldNameArray.length - 1];
  if (forceShow) prePathEntity.forceShowErrorKeys[resultFieldName] = true;
  prePathEntity.errors[resultFieldName] = error;
}

export function removeError(this: BaseEntity, fieldName: string) {
  this.errors[fieldName] = undefined;
}
