import { Transform } from "class-transformer";
import { isString } from "class-validator";
import { isNumber } from "@worksolutions/utils";

function transform(value: any) {
  if (isNumber(value)) return value.toString();
  if (isString(value)) return value;
  if (value === null || value === undefined) return value as null | undefined;
  throw new Error("Invalid value");
}

export function NumberToStringConverter() {
  return Transform(({ value }) => transform(value));
}

export function NumberToStringArrayConverter() {
  return Transform(({ value }) => {
    if (value === null || value === undefined) return value;
    if (!Array.isArray(value)) throw new Error("Invalid value");
    return value.map((value) => transform(value));
  });
}
