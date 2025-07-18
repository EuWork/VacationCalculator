import { DateTime, DurationUnit } from "luxon";
import { isDateSame } from "@worksolutions/utils";

export function simpleChange<VALUE extends string | number | boolean | null>(from: VALUE, to: VALUE) {
  if (from === to) return undefined;
  return to;
}

export function datesChange(from: Date | null, to: Date | null, comparisonBy?: DurationUnit) {
  const convertedFrom = from ? DateTime.fromJSDate(from) : null;
  const convertedTo = to ? DateTime.fromJSDate(to) : null;

  if (convertedFrom === null && convertedTo === null) return undefined;
  if (convertedTo === null) return null;
  if (convertedFrom === null) return to;

  return isDateSame({ value: convertedFrom, comparisonWith: convertedTo }, comparisonBy) ? undefined : to;
}
