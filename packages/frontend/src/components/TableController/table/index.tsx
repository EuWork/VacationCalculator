import React from "react";
import { observer } from "mobx-react-lite";

import { TableController } from "libs";

import Table, { TableInterface } from "components/Table";

type TableControllerRendererInterface<DATASET extends object> = Pick<
  TableInterface<DATASET>,
  | "outerClassName"
  | "tableClassName"
  | "sticky"
  | "size"
  | "emptyTextDescription"
  | "emptyTextTitle"
  | "onRowHover"
  | "onRowClick"
  | "pagination"
  | "onPaginationPageChange"
  | "scrollX"
  | "scrollY"
  | "virtual"
  | "outerRef"
> & {
  table: TableController<DATASET>;
};

function TableControllerRendererComponent<DATASET extends object>({
  table,
  ...props
}: TableControllerRendererInterface<DATASET>) {
  return (
    <Table
      {...props}
      loading={table.loading.loading}
      headerColumns={table._resultHeaderColumns}
      dataset={table._resultDataset}
      selectableIds={table._resultSelectableIds}
      selectedIds={table._resultSelectedIds}
      onChangeSelected={table._resultOnChangeSelected}
      expandable={table._resultExpandable}
      expandedIds={table._resultExpandedIds}
      onChangeExpanded={table._resultOnChangeExpanded}
    />
  );
}

export const TableControllerRenderer = observer(TableControllerRendererComponent);
