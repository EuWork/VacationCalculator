import React, { useMemo } from "react";
import cn from "classnames";
import { observer } from "mobx-react-lite";
import { Tooltip } from "@app/ui";

import { ForbiddenIntersection, UserItem } from "../../index";
import { vacationActiveStyle, forbiddenIntersectionStyle, vacationCellBase } from "./style.css";

interface VacationCellProps {
  value: UserItem | null | undefined;
  date: string;
  allUsers: UserItem[];
  forbiddenIntersections: ForbiddenIntersection[];
}

function VacationCell({ value, date, allUsers, forbiddenIntersections }: VacationCellProps) {
  if (!value) return null;

  const usersAgg = useMemo(() => {
    const map = new Map<
      string,
      {
        fullName: string;
        allDates: Set<string>;
        group: string | null;
      }
    >();

    for (const u of allUsers) {
      const key = u.fullName.trim();
      const entry = map.get(key);
      if (entry) {
        u.vacationDates.forEach((d) => entry.allDates.add(d));
        if (!entry.group && u.group) entry.group = u.group;
      } else {
        map.set(key, {
          fullName: key,
          allDates: new Set(u.vacationDates),
          group: u.group ?? null,
        });
      }
    }

    return map;
  }, [allUsers]);

  const selfAgg = usersAgg.get(value.fullName.trim());

  const isVacation = !!selfAgg && selfAgg.allDates.has(date);

  if (!isVacation) {
    return <div />;
  }

  const fMap = useMemo(() => {
    const m = new Map<string, ForbiddenIntersection>();
    for (const fi of forbiddenIntersections) {
      const k = makePairKey(fi.employee1, fi.employee2);
      if (!m.has(k)) m.set(k, fi);
    }
    return m;
  }, [forbiddenIntersections]);

  const intersections: { otherName: string; group: string }[] = [];
  for (const [otherName, other] of usersAgg) {
    if (otherName === value.fullName.trim()) continue;

    const key = makePairKey(value.fullName, otherName);
    const fi = fMap.get(key);
    if (!fi) continue;

    if (other.allDates.has(date)) {
      intersections.push({ otherName, group: fi.group });
    }
  }

  const hasIntersection = intersections.length > 0;

  const tooltipText = hasIntersection
    ? intersections.map((i) => `Пересечение с ${i.otherName} (группа: ${i.group})`).join("\n")
    : null;

  return (
    <Tooltip text={tooltipText}>
      <div
        className={cn({
          [vacationActiveStyle]: isVacation && !hasIntersection,
          [forbiddenIntersectionStyle]: isVacation && hasIntersection,
        })}
      >
        ㅤ<div className={vacationCellBase}></div>
      </div>
    </Tooltip>
  );
}

export default observer(VacationCell);

function makePairKey(a: string, b: string): string {
  const na = normalizeName(a);
  const nb = normalizeName(b);
  return na < nb ? `${na}|||${nb}` : `${nb}|||${na}`;
}

function normalizeName(s: string): string {
  return s.trim().replace(/\s+/g, " ").toLowerCase();
}
