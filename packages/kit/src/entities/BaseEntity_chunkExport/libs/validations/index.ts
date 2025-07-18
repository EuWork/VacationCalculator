import { getMetadataStorage, validate } from "class-validator";
import { uniq } from "@worksolutions/utils";
import { observe, runInAction } from "mobx";
import debounce from "lodash.debounce";

import type { BaseEntity } from "../../index";

export interface ValidateOptions {
  stopAtFirstError?: boolean;
  groups?: string[];
}

export function validateAsync(this: BaseEntity, { stopAtFirstError = false, groups }: ValidateOptions = {}) {
  return validate(this, { stopAtFirstError, groups, forbidUnknownValues: false });
}

export async function validateAsyncAndThrowFirstError(
  this: BaseEntity,
  validateOptions?: Omit<ValidateOptions, "stopAtFirstError">,
) {
  const [error] = await validateAsync.call(this, { ...validateOptions, stopAtFirstError: true });
  if (error) throw error;
}

export function subscribeFullValid(this: BaseEntity) {
  const validator = async () => {
    const [error] = await this.validateAsync({ stopAtFirstError: true });
    runInAction(() => (this.fullValid = !error));
  };

  observe(this, debounce(validator, 1));
}

export function getValidationGroupFields(this: BaseEntity, validationGroups: string[], strict = false) {
  const validators = getMetadataStorage().getTargetValidationMetadatas(
    // @ts-ignore
    this.__proto__.constructor,
    undefined!,
    false,
    strict,
    validationGroups,
  );
  return uniq(validators.map((validator) => validator.propertyName));
}

export function hasValidationGroupError(this: BaseEntity, validationGroup: string) {
  const fields = getValidationGroupFields.call(this, [validationGroup]);
  return !!fields.find((field) => !!(this.errors as any)[field]);
}

export function getHasAnyUnresolvedErrors(this: BaseEntity) {
  return !!Object.values(this.errors).find((error) => error);
}
