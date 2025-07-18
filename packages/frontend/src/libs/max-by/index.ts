export function maxByOrNull<ITEM>(predicate: (item: ITEM) => number, list: ITEM[]) {
  if (!list[0]) return null;
  let maxItem = { predicateValue: predicate(list[0]), item: list[0] };
  for (let i = 1; i < list.length; i++) {
    const item = list[i]!;
    const predicateValue = predicate(item);
    if (maxItem.predicateValue > predicateValue) continue;
    maxItem = { predicateValue, item };
  }

  return maxItem;
}
