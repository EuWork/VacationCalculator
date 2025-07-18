import { Transform } from "class-transformer";
import {
  IS_DATE,
  isDateString,
  isNumberString,
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
} from "class-validator";

import { applyDecorators } from "libs/applyDecorators_chunkExport";

function convertToDate(value: any) {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (value instanceof Date) return value;
  if (isNumberString(value)) return new Date(parseInt(value));
  if (isDateString(value)) return new Date(value);
  return null;
}

function convertFromDate(value: any) {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (value instanceof Date) return value.toISOString();
  return null;
}

export function IsDate(options?: ValidationOptions) {
  return applyDecorators(
    Transform((params) => convertToDate(params.value), { toClassOnly: true }),
    Transform((params) => convertFromDate(params.value), { toPlainOnly: true }),
    (object: any, propertyName: any) =>
      registerDecorator({
        name: IS_DATE,
        target: object.constructor,
        options,
        propertyName,
        validator: IsDateValidator,
      }),
  );
}

export const isDataValidatorName = "CustomIsDate";

@ValidatorConstraint({ name: isDataValidatorName })
class IsDateValidator implements ValidatorConstraintInterface {
  validate() {
    return true;
  }
}

export function getIsDateSchema() {
  return {
    type: "string",
    format: "date-time",
    example: "2025-04-16T17:20:23.217Z",
  } as const;
}

export function IsDateArray() {
  return applyDecorators(
    Transform(
      (params) => {
        if (!Array.isArray(params.value)) throw new Error("Value must be an array");
        return params.value.map((value) => convertToDate(value));
      },
      { toClassOnly: true },
    ),
    Transform(
      (params) => {
        if (!Array.isArray(params.value)) throw new Error("Value must be an array");
        return params.value.map((value) => convertFromDate(value));
      },
      { toPlainOnly: true },
    ),
  );
}
