import { BaseEntity } from "@app/kit";
import { action, computed, observable } from "mobx";

import { sortNumber, sortString } from "libs";

import type {
  TableDataset,
  TableDatasetField,
  TableHeaderColumnSorting,
  TableHeaderColumnSortingOrder,
} from "components/Table";

export type TCSortingFunction<DATASET extends object> =
  | "auto"
  | "auto-number"
  | {
      type: "indexes";
      func: (list: TableDataset<DATASET>[], order: Exclude<TableHeaderColumnSortingOrder, null>) => number[];
    }
  | {
      type: "array";
      func: (
        list: TableDataset<DATASET>[],
        order: Exclude<TableHeaderColumnSortingOrder, null>,
      ) => TableDataset<DATASET>[];
    };

export type TCHeaderColumnSorting<DATASET extends object> =
  | ({
      dataKey: TableDatasetField<DATASET>;
      sortingOrder: Exclude<TableHeaderColumnSortingOrder, null>;
    } & Omit<TableHeaderColumnSorting, "sortingOrder">)
  | undefined;

export class Sorting<DATASET extends object> extends BaseEntity {
  constructor() {
    super();
    this.mobx();
  }

  @observable private options = new Map<
    string,
    { sortingOrder: TableHeaderColumnSortingOrder; sortFunction: TCSortingFunction<DATASET> | undefined }
  >();

  @action initializeHeaderColumnSorting(
    dataKey: TableDatasetField<DATASET> | undefined,
    { sortFunction, sortingKey }: { sortFunction?: TCSortingFunction<DATASET>; sortingKey?: string },
  ) {
    const resultKey = sortingKey ?? dataKey;
    if (!resultKey) return;
    if (this.options.has(resultKey)) {
      this.options.get(resultKey)!.sortFunction = sortFunction;
    } else {
      this.options.set(resultKey, { sortingOrder: null, sortFunction });
    }
  }

  @computed get headerColumnSortings(): Record<string, TableHeaderColumnSorting | undefined> {
    const entries: [string, TableHeaderColumnSorting][] = [...this.options.entries()].map(([dataKey, sorting]) => [
      dataKey,
      {
        sortingOrder: sorting.sortingOrder,
        onSortingChange: action((order) => {
          this.options.forEach((option) => (option.sortingOrder = null));
          if (order === null) return;
          sorting.sortingOrder = order;
        }),
      },
    ]);

    return Object.fromEntries(entries);
  }

  @computed get headerColumnSorting(): TCHeaderColumnSorting<DATASET> {
    const entries = Object.entries(this.headerColumnSortings);
    const activeSortingEntry = entries.find(([, sorting]) => sorting!.sortingOrder !== null);
    if (!activeSortingEntry) return undefined;

    const headerColumnSorting = activeSortingEntry[1]! as Exclude<TCHeaderColumnSorting<DATASET>, undefined>;
    return { ...headerColumnSorting, dataKey: activeSortingEntry[0] as TableDatasetField<DATASET> };
  }

  sortDataset(dataset: TableDataset<DATASET>[]) {
    let resultDataset = dataset;

    for (const [field, { sortFunction, sortingOrder }] of this.options.entries()) {
      if (sortingOrder === null) continue;
      if (!sortFunction) continue;

      if (sortFunction === "auto") {
        resultDataset = sortString(resultDataset as any[], (item) => item[field], sortingOrder);
        continue;
      }

      if (sortFunction === "auto-number") {
        resultDataset = sortNumber(resultDataset as any[], (item) => item[field], sortingOrder);
        continue;
      }

      if (sortFunction.type === "indexes") {
        resultDataset = orderByIndexes(resultDataset, sortFunction.func(resultDataset, sortingOrder));
        continue;
      }

      if (sortFunction.type === "array") {
        resultDataset = sortFunction.func(resultDataset, sortingOrder);
        continue;
      }
    }

    return resultDataset;
  }

  @action setSortingOrder = (field: string, order: TableHeaderColumnSortingOrder) => {
    this.options.forEach((option) => (option.sortingOrder = null));
    const option = this.options.get(field);
    if (option) {
      option.sortingOrder = order;
    } else {
      this.options.set(field, { sortFunction: undefined, sortingOrder: order });
    }
  };

  onSortingChange = (callback: () => void) => this.onFieldChange(callback, "headerColumnSorting", 0);
}

function orderByIndexes<T extends object>(originalDataset: TableDataset<T>[], newOrderIndexes: number[]) {
  return newOrderIndexes.map((index) => originalDataset[index]);
}
