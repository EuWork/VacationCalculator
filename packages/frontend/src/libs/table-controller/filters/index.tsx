import { BaseEntity } from "@app/kit";
import { action, computed, observable } from "mobx";
import React from "react";

import {
  TableDataset,
  TableDatasetField,
  TableHeaderColumnFilter,
  TableFilterMultipleSelect,
  TableFilterCheckboxes,
  TableFilterCheckboxesValue,
  TableFilterMultipleSelectValue,
  TableFilterDatesValue,
  TableFilterDates,
  TableFilterDatesValueResult,
  TableFilterCheckboxesTreeValue,
  TableFilterCheckboxesTree,
  TableFilterRange,
  TableFilterRangeValue,
} from "components/Table";
import type { FormFieldMultipleSelectItem, FormFieldMultipleSelectValue } from "components/FormFields/MultipleSelect";
import type { FormFieldCheckboxesItem, FormFieldCheckboxesValue } from "components/FormFields/Checkboxes";
import type { FormFieldCheckboxesTreeItem, FormFieldCheckboxesTreeValue } from "components/FormFields/CheckboxesTree";
import type { FormFieldRangeValue } from "components/FormFields/Range";

type ContentCheckboxes = {
  type: "checkboxes";
  searchable?: boolean;
  searchPlaceholder?: string;
  value: TableFilterCheckboxesValue;
  items: FormFieldCheckboxesItem[] | (() => FormFieldCheckboxesItem[]);
  filterFunction?: (value: TableFilterCheckboxesValue, item: any) => boolean;
};

type ContentCheckboxesTree = {
  type: "checkboxesTree";
  value: TableFilterCheckboxesTreeValue;
  searchable?: boolean;
  searchPlaceholder?: string;
  items: FormFieldCheckboxesTreeItem[] | (() => FormFieldCheckboxesTreeItem[]);
  filterFunction?: (value: TableFilterCheckboxesTreeValue, item: any) => boolean;
};

type ContentDates = {
  type: "dates";
  value: TableFilterDatesValue;
  filterFunction?: undefined;
};

type ContentMultipleSelect = {
  type: "multipleSelect";
  value: TableFilterMultipleSelectValue;
  placeholder: string;
  items: FormFieldMultipleSelectItem[] | (() => FormFieldMultipleSelectItem[]);
  filterFunction?: (value: TableFilterMultipleSelectValue, item: any) => boolean;
};

type ContentRange = {
  type: "range";
  value: TableFilterRangeValue;
  filterFunction?: (value: TableFilterRangeValue, item: any) => boolean;
};

export type TCFilterOptions =
  | ContentCheckboxes
  | ContentCheckboxesTree
  | ContentDates
  | ContentMultipleSelect
  | ContentRange;

export class Filters<DATASET extends object> extends BaseEntity {
  constructor() {
    super();
    this.mobx();
  }

  @observable private options = new Map<string, { column: TableHeaderColumnFilter; options: TCFilterOptions }>();

  @action initializeHeaderColumnFilter(
    dataKey: TableDatasetField<DATASET> | undefined,
    newOptions: { config: TCFilterOptions; filterKey?: string },
  ) {
    const resultKey = newOptions.filterKey ?? dataKey;
    if (!resultKey) return;
    if (this.options.has(resultKey)) {
      const option = this.options.get(resultKey)!;
      Object.assign(option.options, newOptions.config);
      return;
    }

    this.options.set(resultKey, {
      column: {
        dropdownOpened: false,
        onDropdownOpenChange: (opened) => this.onDropdownOpenChange(resultKey, opened),
        filtered: false,
        dropdown: null,
      },
      options: newOptions.config,
    });
  }

  @computed get headerColumnFilters(): Record<string, TableHeaderColumnFilter | undefined> {
    const entries: [string, TableHeaderColumnFilter][] = [...this.options.entries()].map(([dataKey, filter]) => {
      switch (filter.options.type) {
        case "checkboxes":
          return [dataKey, { ...filter.column, ...this.createCheckboxHeaderColumnFilter(dataKey, filter.options) }];
        case "checkboxesTree":
          return [dataKey, { ...filter.column, ...this.createCheckboxTreeHeaderColumnFilter(dataKey, filter.options) }];
        case "multipleSelect":
          return [
            dataKey,
            { ...filter.column, ...this.createMultipleSelectHeaderColumnFilter(dataKey, filter.options) },
          ];
        case "dates":
          return [dataKey, { ...filter.column, ...this.createDateHeaderColumnFilter(dataKey, filter.options) }];
        case "range":
          return [dataKey, { ...filter.column, ...this.createRangeHeaderColumnFilter(dataKey, filter.options) }];
      }

      return [dataKey, filter.column];
    });

    return Object.fromEntries(entries);
  }

  private createCheckboxHeaderColumnFilter(dataKey: string, content: ContentCheckboxes) {
    return {
      filtered: content.value._filtered,
      dropdown: (
        <TableFilterCheckboxes
          __rand={Math.random()}
          value={content.value}
          items={content.items}
          searchable={content.searchable}
          searchPlaceholder={content.searchPlaceholder}
          onClose={() => this.onDropdownOpenChange(dataKey, false)}
        />
      ),
    };
  }

  private createCheckboxTreeHeaderColumnFilter(dataKey: string, content: ContentCheckboxesTree) {
    return {
      filtered: content.value._filtered,
      dropdown: (
        <TableFilterCheckboxesTree
          __rand={Math.random()}
          value={content.value}
          items={content.items}
          searchable={content.searchable}
          searchPlaceholder={content.searchPlaceholder}
          onClose={() => this.onDropdownOpenChange(dataKey, false)}
        />
      ),
    };
  }

  private createMultipleSelectHeaderColumnFilter(dataKey: string, content: ContentMultipleSelect) {
    return {
      filtered: content.value._filtered,
      dropdown: (
        <TableFilterMultipleSelect
          __rand={Math.random()}
          value={content.value}
          placeholder={content.placeholder}
          items={content.items}
          onClose={() => this.onDropdownOpenChange(dataKey, false)}
        />
      ),
    };
  }

  private createDateHeaderColumnFilter(dataKey: string, content: ContentDates) {
    return {
      filtered: content.value._filtered,
      dropdown: (
        <TableFilterDates
          __rand={Math.random()}
          value={content.value}
          onClose={() => this.onDropdownOpenChange(dataKey, false)}
        />
      ),
    };
  }

  private createRangeHeaderColumnFilter(dataKey: string, content: ContentRange) {
    return {
      filtered: content.value._filtered,
      dropdown: (
        <TableFilterRange
          __rand={Math.random()}
          value={content.value}
          onClose={() => this.onDropdownOpenChange(dataKey, false)}
        />
      ),
    };
  }

  filterDataset(dataset: TableDataset<DATASET>[]) {
    let resultDataset = dataset;
    for (const filter of this.options.values()) {
      const content = filter.options;
      if (!content.filterFunction) continue;

      switch (content.type) {
        case "checkboxes": {
          if (content.value.value.length === 0) continue;
          resultDataset = resultDataset.filter((item) => content.filterFunction!(content.value, item));
          break;
        }
        case "checkboxesTree": {
          if (content.value.value.length === 0) continue;
          resultDataset = resultDataset.filter((item) => content.filterFunction!(content.value, item));
          break;
        }
        case "multipleSelect": {
          if (content.value.value.length === 0) continue;
          resultDataset = resultDataset.filter((item) => content.filterFunction!(content.value, item));
          break;
        }
      }
    }

    return resultDataset;
  }

  @action private onDropdownOpenChange(key: string, opened: boolean) {
    this.options.get(key)!.column.dropdownOpened = opened;
  }

  @action setFilterValue = (
    columnKey: string,
    value:
      | { type: "dates"; value: TableFilterDatesValueResult | undefined }
      | { type: "checkboxes"; value: FormFieldCheckboxesValue }
      | { type: "checkboxesTree"; value: FormFieldCheckboxesTreeValue }
      | { type: "multipleSelect"; value: FormFieldMultipleSelectValue }
      | { type: "range"; value: FormFieldRangeValue },
  ) => {
    const column = this.options.get(columnKey);
    if (!column) throw new Error("Unknown column " + columnKey);

    if (value.type === "dates" && column.options.type === "dates")
      return void column.options.value.setValue(value.value);
    if (value.type === "checkboxes" && column.options.type === "checkboxes")
      return void column.options.value.setValue(value.value);
    if (value.type === "checkboxesTree" && column.options.type === "checkboxesTree")
      return void column.options.value.setValue(value.value);
    if (value.type === "multipleSelect" && column.options.type === "multipleSelect")
      return void column.options.value.setValue(value.value);
    if (value.type === "range" && column.options.type === "range")
      return void column.options.value.setValue(value.value);

    throw new Error("Wrong value type: passed " + value.type + " expected " + column.options.type);
  };
}
