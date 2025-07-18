import React from "react";
import { Table as AntTable } from "antd";
import { TableLocale } from "antd/es/table/interface";
import cn from "classnames";
import { Reference } from "rc-table/lib/interface";
import { TableProps } from "antd/es/table/InternalTable";
import { isNil } from "@worksolutions/utils";
import { observer } from "mobx-react-lite";

import Pagination, { PaginationCountsInterface } from "components/Pagination";
import NoData from "components/NoData";

import { TableDataset, TableHeaderColumn, TableSize } from "./types";
import { useColumns } from "./hooks/useColumns";
import { useRowClickEvent } from "./hooks/useRowClickEvent";
import { useRowHoverEvent } from "./hooks/useRowHoverEvent";
import { useRowSelection } from "./hooks/useRowSelection";
import { useExpandable } from "./hooks/useExpandable";

import { outerStyles } from "./styles/outer.css";
import { paginationWrapperStyles } from "./styles/pagination.css";
import { tableSizeStyleVariants } from "./styles/sizes.css";
import { tableRowExpandableStyles } from "./styles/expandable.css";
import { tableStyles } from "./styles/table.css";
import { tableVirtualStyles } from "./styles/virtual.css";
import { flexFullHeightStyles } from "./styles/flexFullHeight.css";
import "./styles/sort.css";

export interface TableRowHoverInterface {
  element: HTMLElement;
  id: string;
}

export interface TableRowClickInterface {
  element: HTMLElement;
  id: string;
}

export interface TableInterface<DATASET extends object> {
  outerClassName?: string;
  tableClassName?: string;
  outerRef?: React.Ref<HTMLDivElement>;
  sticky?: boolean;
  dataset: TableDataset<DATASET>[];
  size?: TableSize;
  headerColumns: TableHeaderColumn<DATASET>[];
  emptyTextDescription: string;
  emptyTextTitle?: string;
  onRowHover?: (data: TableRowHoverInterface | null) => void;
  onRowClick?: (data: TableRowClickInterface) => void;
  pagination?: PaginationCountsInterface | null;
  onPaginationPageChange?: (page: number) => void;
  loading?: boolean;
  scrollX?: number;
  scrollY?: number;
  virtual?: boolean;
  selectableIds?: string[];
  selectedIds?: string[];
  onChangeSelected?: (selectedIds: string[]) => void;
  expandable?: boolean;
  expandedIds?: string[];
  onChangeExpanded?: (expandedIds: string[]) => void;
}

function Table<DATASET extends object>({
  outerClassName,
  tableClassName,
  outerRef,
  sticky = true,
  size = "default",
  dataset,
  headerColumns,
  emptyTextDescription,
  emptyTextTitle,
  onRowHover,
  onRowClick,
  loading,
  pagination,
  onPaginationPageChange,
  scrollX,
  scrollY,
  virtual,
  selectableIds,
  selectedIds,
  onChangeSelected,
  expandable,
  expandedIds,
  onChangeExpanded,
}: TableInterface<DATASET>) {
  const [columns, handleChange] = useColumns(headerColumns);

  const locale = React.useMemo<TableLocale>(
    () => ({
      emptyText: <NoData title={emptyTextTitle} description={emptyTextDescription} />,
    }),
    [emptyTextDescription, emptyTextTitle],
  );

  const tableRef = React.useRef<Reference | null>(null);

  useRowClickEvent(tableRef, onRowClick);
  useRowHoverEvent(tableRef, onRowHover);
  const rowSelection = useRowSelection({ selectableIds, selectedIds, onChangeSelected });
  const expandableConfig = useExpandable({ expandable, expandedIds, onChangeExpanded });

  const antScroll = React.useMemo<TableProps["scroll"]>(
    () => (isNil(scrollX) && isNil(scrollY) ? undefined : { x: scrollX, y: scrollY }),
    [scrollX, scrollY],
  );

  const getRowClassName = React.useCallback(
    (record: Pick<TableDataset<{}>, "__children">) => (record.__children ? tableRowExpandableStyles : ""),
    [],
  );

  const tableChild = (
    <AntTable
      ref={tableRef}
      className={cn(
        tableClassName,
        tableStyles,
        virtual && tableVirtualStyles,
        tableSizeStyleVariants[size],
        flexFullHeightStyles,
      )}
      locale={locale}
      sticky={sticky}
      pagination={false}
      columns={columns}
      dataSource={dataset}
      rowKey="id"
      loading={loading}
      onChange={handleChange}
      scroll={antScroll}
      expandable={expandableConfig}
      rowSelection={rowSelection}
      rowClassName={getRowClassName}
      virtual={virtual}
    />
  );

  const paginationElement = pagination && onPaginationPageChange && (
    <div className={paginationWrapperStyles}>
      <Pagination disabled={loading} onChange={onPaginationPageChange} {...pagination} />
    </div>
  );

  return (
    <div ref={outerRef} className={cn(outerClassName, outerStyles)}>
      {antScroll && (antScroll.x === 0 || antScroll.y === 0) ? undefined : tableChild}
      {paginationElement}
    </div>
  );
}

export default observer(Table);

export * from "./types";
export { TableContextProvider } from "./context";
export * from "./Filters";
export { default as TableCellRendererWrapper } from "./Renderers/_wrapper";
