import { DateTime } from "luxon";

export function convertLuxonToJs(value: DateTime, fixZone = true): Date {
  const date = value.toJSDate();
  if (fixZone) date.setUTCHours(date.getUTCHours() + value.zone.offset(0) / 60);
  return date;
}
