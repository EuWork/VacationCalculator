import { ValidationError } from "class-validator";

import { validateAsync, ValidateOptions } from "../validations";
import { BaseEntity } from "../../index";

function applyErrors(target: BaseEntity, errors: ValidationError[]) {
  for (const error of errors) {
    const mainErrorField = error.property as keyof BaseEntity;
    if (error.constraints) target.setError(mainErrorField, error.constraints[Object.keys(error.constraints)[0]]);
    else target.setError(mainErrorField, "_");
  }
}

async function validateAndSetErrors(this: BaseEntity, options: ValidateOptions = {}) {
  const validationErrors = await validateAsync.call(this, options);
  if (validationErrors.length === 0) return { valid: true } as const;
  applyErrors(this, validationErrors);
  return { valid: false, errors: validationErrors } as const;
}

function getAllSubEntities(this: BaseEntity) {
  const subEntities: BaseEntity[] = [];
  Object.values(this).forEach((value) => {
    if (BaseEntity.isBaseEntity(value)) subEntities.push(value);
    if (Array.isArray(value)) {
      value.forEach((value) => {
        if (BaseEntity.isBaseEntity(value)) subEntities.push(value);
      });
    }
  });
  subEntities.forEach((entity) => subEntities.push(...getAllSubEntities.call(entity)));
  return subEntities;
}

async function submitEntity(this: BaseEntity, options?: ValidateOptions) {
  this.forceShowErrorKeys = {};
  this.submitted = true;
  const result = await validateAndSetErrors.call(this, options);
  this.lastSubmitValid = result.valid;
  return result;
}

//TODO: вызывать сабмиты только для тех сущностей у которых есть @ValidateNested
export async function submit(this: BaseEntity, options?: ValidateOptions) {
  const entities = [this, ...getAllSubEntities.call(this)];
  const results = await Promise.all(entities.map((entity) => submitEntity.call(entity, options)));
  return !results.some((result) => !result.valid);
}
