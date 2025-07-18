import React from "react";
import { Checkbox } from "antd";
import cn from "classnames";
import { observer } from "mobx-react-lite";
import { Scroll } from "@app/ui";
import { useDebouncedInput } from "@worksolutions/react-utils";
import { identity } from "@worksolutions/utils";

import SearchInput from "../CheckboxesTree/Search";
import { useFilteredOptions } from "./hooks/useFilteredOptions";
import { useClick } from "./hooks/useClick";

import { wrapperStyles } from "./style.css";

export interface FormFieldCheckboxesItem {
  label: React.ReactNode;
  value: string;
}

export type FormFieldCheckboxesValue = string[];

export interface FormFieldCheckboxesInterface {
  className?: string;
  searchClassName?: string;
  search?: string;
  setSearch?: (value: string) => void;
  searchable?: boolean;
  searchPlaceholder?: string;
  scroll?: boolean;
  scrollClassName?: string;
  scrollContentClassName?: string;
  items: FormFieldCheckboxesItem[];
  value: FormFieldCheckboxesValue;
  setValue: (state: FormFieldCheckboxesValue) => void;
}

function FormFieldCheckboxes({
  className,
  searchClassName,
  items,
  value,
  search: searchProp,
  setSearch: setSearchProp,
  searchable,
  searchPlaceholder,
  scroll,
  scrollClassName,
  scrollContentClassName,
  setValue,
}: FormFieldCheckboxesInterface) {
  const search = searchProp ?? "";
  const { inputValue: searchInputValue, onInputChange: searchInputChange } = useDebouncedInput(
    search,
    300,
    setSearchProp ?? identity,
  );

  const filteredItems = useFilteredOptions(items, search);

  const handleClickFabric = useClick(value, setValue);

  const content = filteredItems.map((item) => (
    <Checkbox key={item.value} checked={value.includes(item.value)} onClick={handleClickFabric(item.value)}>
      {item.label}
    </Checkbox>
  ));

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
      {scroll ? (
        <Scroll className={scrollClassName}>
          <div className={scrollContentClassName}>{content}</div>
        </Scroll>
      ) : (
        content
      )}
    </div>
  );
}

export default observer(FormFieldCheckboxes);
