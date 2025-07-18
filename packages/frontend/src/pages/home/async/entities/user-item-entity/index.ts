import { action, observable } from "mobx";
import { BaseEntity } from "@app/kit";
import { DateTime } from "luxon";

import { UserItem } from "../../index";

export type DateRange = [DateTime, DateTime];

export class UserItemEntity extends BaseEntity {
  static build(item: UserItem): UserItemEntity {
    const entity = new UserItemEntity();
    entity.id = item.id;
    entity.fullName = item.fullName;
    entity.group = item.group;
    entity.vacationDates = item.vacationDates;
    return entity;
  }

  static buildEmpty(): UserItemEntity {
    return new UserItemEntity();
  }

  constructor() {
    super();
    this.mobx();
  }

  @observable id = "";
  @observable fullName = "";
  @observable group: string | null = "";
  @observable vacationDates: string[] = [];

  @action setFullName = (name: string) => {
    this.fullName = name;
  };

  @action setGroup = (group: string | null) => {
    this.group = group;
  };

  @action setVacationDates = (dates: string[]) => {
    this.vacationDates = dates;
  };

  @action addVacationPeriod(range: DateRange) {
    const [start, end] = range;
    const from = start.startOf("day");
    const to = end.startOf("day");

    let cursor = from;
    const newDates = new Set(this.vacationDates);

    while (cursor <= to) {
      newDates.add(cursor.toISODate()!);
      cursor = cursor.plus({ days: 1 });
    }

    this.vacationDates = Array.from(newDates).sort();
  }

  @action removeVacationPeriod(range: DateRange) {
    const [start, end] = range;
    const from = start.startOf("day");
    const to = end.startOf("day");

    this.vacationDates = this.vacationDates.filter((dateStr) => {
      const date = DateTime.fromISO(dateStr).startOf("day");
      return date < from || date > to;
    });
  }

  isDateAlreadyAdded(date: DateTime, collection: string[] = this.vacationDates): boolean {
    const iso = date.toISODate();
    return collection.includes(iso!);
  }

  groupDatesIntoRanges(dates: string[]): DateRange[] {
    const parsedDates = dates
      .map((d) => DateTime.fromISO(d))
      .filter((d) => d.isValid)
      .sort((a, b) => a.toMillis() - b.toMillis());

    if (parsedDates.length === 0) return [];

    const ranges: DateRange[] = [];

    let rangeStart = parsedDates[0];
    let rangeEnd = parsedDates[0];

    for (let i = 1; i < parsedDates.length; i++) {
      const current = parsedDates[i];
      const diff = current.diff(rangeEnd, "days").days;

      if (diff === 1) {
        rangeEnd = current;
      } else {
        ranges.push([rangeStart, rangeEnd]);
        rangeStart = current;
        rangeEnd = current;
      }
    }

    ranges.push([rangeStart, rangeEnd]);

    return ranges;
  }
}
