import React from "react";
import { type SorterResult, type TableCurrentDataSource } from "antd/es/table/interface";
import { useDebouncedValue } from "@worksolutions/react-utils";

import { TableHeaderColumn } from "../../types";
import { ColumnsBuilder } from "./columns-builder";

export function useColumns<DATASET extends object>(headerColumnsOriginal: TableHeaderColumn<DATASET>[]) {
  const headerColumns = useDebouncedValue(headerColumnsOriginal, 2);
  const builder = React.useMemo(() => new ColumnsBuilder<DATASET>(), []);

  const columns = React.useMemo(() => builder.buildColumns(headerColumns), [builder, headerColumns]);

  const handleChange = React.useCallback(
    (_1: any, _2: any, sorter: SorterResult<any> | SorterResult<any>[], extra: TableCurrentDataSource<any>) =>
      builder.handleChange(columns, sorter, extra),
    [builder, columns],
  );

  return [columns, handleChange] as const;
}
