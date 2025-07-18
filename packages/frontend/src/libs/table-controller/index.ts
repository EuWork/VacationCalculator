import { BaseEntity } from "@app/kit";
import { action, computed, observable } from "mobx";

import { Loading } from "libs";

import { type TableDataset, type TableHeaderColumn } from "components/Table";

import { Sorting, TCSortingFunction } from "./sorting";
import { Filters, TCFilterOptions } from "./filters";
import { Selector } from "./selector";
import { Expander } from "./expander";

type TableControllerResultHeaderColumn<DATASET extends object> = Omit<
  TableHeaderColumn<DATASET>,
  "filter" | "sorting"
> & {
  sorting: { sortFunction?: TCSortingFunction<DATASET>; sortingKey?: string } | undefined;
  filter: { config: TCFilterOptions; filterKey?: string } | undefined;
  pinnedLeft: boolean | undefined;
};

export type TableControllerHeaderColumn<DATASET extends object> = Omit<
  TableHeaderColumn<DATASET>,
  "sorting" | "filter"
> & {
  sortable?: { sortFunction?: TCSortingFunction<DATASET>; sortingKey?: string };
  filterable?: { config: TCFilterOptions; filterKey?: string };
  pinnedLeft?: boolean;
};

export class TableController<DATASET extends object> extends BaseEntity {
  static build<DATASET extends object>() {
    return new TableController<DATASET>();
  }

  constructor() {
    super();
    this.mobx();
    this.onFieldChange(this.prepareHeaderColumns, "__resultHeaderColumns", 0);
  }

  @observable loading = new Loading(true);

  @observable.shallow private __resultHeaderColumns: TableControllerResultHeaderColumn<DATASET>[] = [];
  @observable.shallow private __resultDataset: TableDataset<DATASET>[] = [];

  private sorting = new Sorting<DATASET>();
  private filters = new Filters<DATASET>();
  private selector = new Selector();
  private expander = new Expander();

  @action private prepareHeaderColumns = () => {
    this.__resultHeaderColumns.forEach(({ sorting, filter, ...column }) => {
      if (sorting) this.sorting.initializeHeaderColumnSorting(column.dataKey, sorting);
      if (filter) this.filters.initializeHeaderColumnFilter(column.dataKey, filter);
    });
  };

  @computed get _resultHeaderColumns(): TableHeaderColumn<DATASET>[] {
    const { headerColumnSortings } = this.sorting;
    const { headerColumnFilters } = this.filters;

    return this.__resultHeaderColumns.map(({ sorting, filter, ...column }) => ({
      ...column,
      sorting: sorting ? headerColumnSortings[(sorting.sortingKey ?? column.dataKey) as string] : undefined,
      filter: filter ? headerColumnFilters[(filter.filterKey ?? column.dataKey) as string] : undefined,
    }));
  }

  @computed get _resultDataset() {
    return this.sorting.sortDataset(this.filters.filterDataset(this.__resultDataset));
  }

  @action createHeaderColumns(headerColumns: TableControllerHeaderColumn<DATASET>[]) {
    this.__resultHeaderColumns = headerColumns.map(({ sortable, filterable, ...column }) => {
      const resultColumn: TableControllerResultHeaderColumn<DATASET> = {
        pinnedLeft: undefined,
        ...column,
        sorting: undefined,
        filter: undefined,
      };
      if (sortable) resultColumn.sorting = sortable;
      if (filterable) resultColumn.filter = filterable;
      return resultColumn;
    });
  }

  @action createDataset(dataset: TableDataset<DATASET>[]) {
    this.__resultDataset = dataset;
  }

  @computed get setSortingOrder() {
    return this.sorting.setSortingOrder;
  }

  @computed get headerColumnSortings() {
    return this.sorting.headerColumnSortings;
  }

  @computed get headerColumnSorting() {
    return this.sorting.headerColumnSorting;
  }

  @computed get headerColumnSortingOnChange() {
    return this.sorting.onSortingChange;
  }

  @computed get setFilterValue() {
    return this.filters.setFilterValue;
  }

  @computed get setSelectableIds() {
    return this.selector.setSelectableIds;
  }

  @computed get _resultSelectableIds() {
    return this.selector.selectableIds;
  }

  @computed get _resultSelectedIds() {
    return this.selector.selectedIds;
  }

  @computed get _resultOnChangeSelected() {
    return this.selector.setSelectedIds;
  }

  @computed get selectedIds() {
    return this._resultSelectedIds;
  }

  @computed get setSelectedIds() {
    return this.selector.setSelectedIds;
  }

  @computed get onSelectedIdsChange() {
    return this.selector.onSelectedIdsChange;
  }

  @computed get createExpandable() {
    return this.expander.setExpandable;
  }

  @computed get _resultExpandable() {
    return this.expander.expandable;
  }

  @computed get _resultExpandedIds() {
    return this.expander.expandedIds;
  }

  @computed get _resultOnChangeExpanded() {
    return this.expander.setExpandedIds;
  }

  @computed get expandedIds() {
    return this._resultExpandedIds;
  }

  @computed get setExpandedIds() {
    return this.expander.setExpandedIds;
  }

  @computed get onExpandedIdsChange() {
    return this.expander.onExpandedIdsChange;
  }
}

export type { TCHeaderColumnSorting } from "./sorting";
