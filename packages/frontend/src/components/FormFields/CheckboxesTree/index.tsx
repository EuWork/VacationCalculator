import React from "react";
import cn from "classnames";
import { observer } from "mobx-react-lite";
import { Scroll } from "@app/ui";
import { useDebouncedInput } from "@worksolutions/react-utils";
import { identity } from "@worksolutions/utils";

import SearchInput from "./Search";
import TreeContent from "./TreeContent";
import { useFilteredOptions } from "./hooks/useFilteredOptions";

import { wrapperStyles } from "./style.css";

export interface FormFieldCheckboxesTreeItem {
  label: React.ReactNode;
  value: string;
  children?: FormFieldCheckboxesTreeItem[];
}

export type FormFieldCheckboxesTreeValue = string[];

export interface FormFieldCheckboxesTreeInterface {
  className?: string;
  searchClassName?: string;
  search?: string;
  setSearch?: (value: string) => void;
  searchable?: boolean;
  searchPlaceholder?: string;
  items: FormFieldCheckboxesTreeItem[];
  value: FormFieldCheckboxesTreeValue;
  scroll?: boolean;
  scrollClassName?: string;
  setValue: (state: FormFieldCheckboxesTreeValue) => void;
}

function FormFieldCheckboxesTree({
  className,
  searchClassName,
  items,
  value,
  search: searchProp,
  setSearch: setSearchProp,
  searchable,
  searchPlaceholder,
  setValue,
  scroll,
  scrollClassName,
}: FormFieldCheckboxesTreeInterface) {
  const search = searchProp ?? "";
  const { inputValue: searchInputValue, onInputChange: searchInputChange } = useDebouncedInput(
    search,
    300,
    setSearchProp ?? identity,
  );

  const filteredItems = useFilteredOptions(items, search);

  const treeContent = (
    <TreeContent value={value} items={filteredItems} searched={search.length !== 0} onChange={setValue} />
  );

  return (
    <div className={cn(className, wrapperStyles)}>
      {searchable && (
        <SearchInput
          className={searchClassName}
          placeholder={searchPlaceholder}
          value={searchInputValue}
          onChange={searchInputChange}
        />
      )}
      {scroll ? <Scroll className={scrollClassName}>{treeContent}</Scroll> : treeContent}
    </div>
  );
}

export default observer(FormFieldCheckboxesTree);
