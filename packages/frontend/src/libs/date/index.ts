import { DateTime } from "luxon";

export function setDateStartDay(date: DateTime) {
  return date.set({ millisecond: 0, second: 0, minute: 0, hour: 0 });
}

export function setDateEndDay(date: DateTime) {
  return setDateStartDay(date).plus({ day: 1, millisecond: -1 });
}
