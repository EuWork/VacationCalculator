import React from "react";
import type { ColumnsType } from "antd/es/table";
import type { SorterResult, TableCurrentDataSource } from "antd/es/table/interface";
import { isArray } from "@worksolutions/utils";
import cn from "classnames";

import { TableHeaderColumn } from "../../../types";
import { renderers } from "./renderers";
import FirstColumnTooltip from "./FirstColumnTooltip";

import { cellIndicatorStyleVariants, cellStyleVariants } from "../style.css";

export class ColumnsBuilder<DATASET extends object> {
  private getRenderer(
    dataKey: string | undefined,
    column: TableHeaderColumn<DATASET>,
    index: number,
  ): Partial<ColumnsType[number]> {
    const Renderer = (
      column.renderer.type === "custom" ? column.renderer.renderer : renderers[column.renderer.type]
    ) as React.FC<any>;

    return {
      width: column.width ?? (Renderer as any).defaultWidth,
      render: (value, record) => {
        const props = {
          error: record.__error,
          tooltip: record[dataKey + "__tooltip"],
          icon: record[dataKey + "__icon"],
          alignment: column.alignment,
        };

        return (
          <>
            <FirstColumnTooltip index={index} text={record.__indicatorTooltip ?? null} />
            <Renderer
              {...props}
              value={dataKey ? value : record}
              {...("options" in column.renderer ? column.renderer.options : {})}
            />
          </>
        );
      },
    };
  }

  private buildColumn(column: TableHeaderColumn<DATASET>, index: number): ColumnsType[number] {
    const dataKey = column.dataKey as string | undefined;

    const result: ColumnsType[0] & { __onChangeSorting: Function | undefined } = {
      align: column.alignment,
      title: column.name ?? "",
      dataIndex: dataKey,
      key: dataKey,
      ...this.getRenderer(dataKey, column, index),
      __onChangeSorting: column.sorting?.onSortingChange,
      sorter: !!column.sorting,
      showSorterTooltip: false,
      filterDropdown: column.filter?.dropdown,
      filterDropdownProps: { placement: "bottomLeft" },
      filterDropdownOpen: column.filter?.dropdownOpened,
      filtered: column.filter?.filtered,
      filteredValue: null,
      onFilterDropdownOpenChange: column.filter?.onDropdownOpenChange,
      fixed: column.pinnedLeft ? "left" : false,
      onCell: (data) => ({
        colSpan: column.colSpan?.(data as any),
        className: cn(
          data.__success && cellStyleVariants.success,
          data.__warning && cellStyleVariants.warning,
          data.__error && cellStyleVariants.error,
          data.__successIndicator && cellIndicatorStyleVariants.success,
          data.__warningIndicator && cellIndicatorStyleVariants.warning,
          data.__errorIndicator && cellIndicatorStyleVariants.error,
        ),
      }),
    };

    if (column.sorting?.sortingOrder !== undefined) result.sortOrder = column.sorting.sortingOrder;

    return result;
  }

  buildColumns(headerColumns: TableHeaderColumn<DATASET>[]) {
    return headerColumns.map((column, index) => this.buildColumn(column, index));
  }

  handleChange(
    columns: ColumnsType,
    sorter: SorterResult<any> | SorterResult<any>[],
    extra: TableCurrentDataSource<any>,
  ) {
    if (extra.action !== "sort") return;
    if (isArray(sorter)) return;
    if (sorter.column) {
      (sorter.column as any).__onChangeSorting?.(sorter.order);
      return;
    }
    columns.forEach((column) => {
      if (column.sortOrder) (column as any).__onChangeSorting?.(null);
    });
  }
}
