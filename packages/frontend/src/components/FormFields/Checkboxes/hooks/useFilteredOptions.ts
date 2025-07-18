import React from "react";
import { searchInString } from "@worksolutions/utils";

import { FormFieldCheckboxesItem } from "../index";

export function useFilteredOptions(items: FormFieldCheckboxesItem[], search: string) {
  return React.useMemo(() => {
    if (search === "") return items;
    return items.filter((option) => searchInString(String(option.label), search));
  }, [search, items]);
}
