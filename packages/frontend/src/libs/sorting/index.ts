export type SortingOrder = "descend" | "ascend" | null;

export function sortString<ITEM>(list: ITEM[], getValue: (item: ITEM) => string, order: SortingOrder) {
  if (order === null) return list;
  if (order === "ascend") return list.toSorted((a, b) => getValue(a).localeCompare(getValue(b)));
  return list.toSorted((a, b) => getValue(b).localeCompare(getValue(a)));
}

export function sortNumber<ITEM>(list: ITEM[], getValue: (item: ITEM) => number, order: SortingOrder) {
  if (order === null) return list;
  if (order === "ascend") return list.toSorted((a, b) => getValue(a) - getValue(b));
  return list.toSorted((a, b) => getValue(b) - getValue(a));
}
