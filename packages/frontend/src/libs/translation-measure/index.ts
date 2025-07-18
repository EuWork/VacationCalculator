import { nbspString } from "@worksolutions/utils";

export function getTranslationMeasure(measure: string | undefined, value: string | number) {
  if (!measure) return value.toString();
  return value.toString() + nbspString + measure;
}
