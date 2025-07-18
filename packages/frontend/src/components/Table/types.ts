import React from "react";
import type { AlignType } from "rc-table/lib/interface";
import { SortOrder } from "antd/es/table/interface";

import { TableCellRenderer } from "./renderer-types";
import { TableTwoDatesCellOptionsRenderer } from "./Renderers/twoDates";
import { TableDateCellRendererOptions } from "./Renderers/date";
import { TableTextCellRendererOptions } from "./Renderers/text";

export * from "./renderer-types";

export type TableHeaderColumnSortingOrder = SortOrder;

export interface TableHeaderColumnSorting {
  sortingOrder: TableHeaderColumnSortingOrder;
  onSortingChange: (value: TableHeaderColumnSortingOrder) => void;
}

export type TableSize = "default";
export type TableAlignment = AlignType;

export interface TableHeaderColumnFilter {
  dropdown: React.ReactNode;
  dropdownOpened: boolean;
  filtered: boolean;
  onDropdownOpenChange: (opened: boolean) => void;
}

export type TableDatasetField<DATASET extends object> = Exclude<keyof DATASET, number | symbol>;

export interface TableHeaderColumn<DATASET extends object> {
  name?: string;
  dataKey: TableDatasetField<DATASET> | undefined;
  alignment?: TableAlignment;
  renderer:
    | { type: "text"; options?: TableTextCellRendererOptions }
    | { type: "fakeLink" }
    | { type: "tag" }
    | { type: "twoDates"; options: TableTwoDatesCellOptionsRenderer }
    | { type: "date"; options: TableDateCellRendererOptions }
    | { type: "arrow" }
    | { type: "empty" }
    | { type: "custom"; renderer: TableCellRenderer<TableDataset<DATASET>, any>; options?: object };
  width?: number;
  sorting?: TableHeaderColumnSorting;
  filter?: TableHeaderColumnFilter;
  pinnedLeft?: boolean;
  colSpan?: (dataset: TableDataset<DATASET>) => number;
}

export type TableDataset<DATASET extends object> = DATASET &
  Partial<AddPostfixToObject<DATASET, "__tooltip", string>> &
  Partial<AddPostfixToObject<DATASET, "__icon", React.JSX.Element>> & {
    id: string;
    __error?: boolean;
    __success?: boolean;
    __warning?: boolean;
    __errorIndicator?: boolean;
    __successIndicator?: boolean;
    __warningIndicator?: boolean;
    __indicatorTooltip?: string;
    __children?: TableDataset<DATASET>[];
  };

type AddPostfixToObject<OBJECT, POSTFIX extends string, VALUE> = {
  [K in keyof OBJECT as K extends string ? `${K}${POSTFIX}` : never]: VALUE;
};

export type { TableDateCellDataset } from "./Renderers/date";
export type { TableFakeLinkCellDataset } from "./Renderers/fakeLink";
export type { TableTagCellDataset } from "./Renderers/tag";
export type { TableTextCellDataset } from "./Renderers/text";
export type { TableTwoDatesCellDataset } from "./Renderers/twoDates";
