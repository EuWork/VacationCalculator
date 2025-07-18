import React from "react";
import { searchInString } from "@worksolutions/utils";

import { FormFieldCheckboxesTreeItem } from "../index";

function getFlattenOptionsOnlyChildren(items: FormFieldCheckboxesTreeItem[]) {
  const getItems = (items: FormFieldCheckboxesTreeItem[]): Omit<FormFieldCheckboxesTreeItem, "children">[] => {
    const results: FormFieldCheckboxesTreeItem[] = [];

    for (const item of items) {
      if (item.children) results.push({ label: item.label, value: item.value }, ...getItems(item.children));
      else results.push(item);
    }

    return results;
  };

  return getItems(items);
}

export function useFilteredOptions(items: FormFieldCheckboxesTreeItem[], search: string) {
  return React.useMemo(() => {
    if (search === "") return items;
    return getFlattenOptionsOnlyChildren(items).filter((option) => searchInString(String(option.label), search));
  }, [search, items]);
}
