import React from "react";

import Column from "../Column";
import Cell from "../Cell";
import { GanttChartDataset, GanttChartHeaderColumn } from "../../types";
import HeaderCellRenderer from "./HeaderCellRenderer";

interface HeaderColumnsInterface<DATASET extends object> {
  headerColumns: GanttChartHeaderColumn<DATASET>[];
  headerCellHeight: number;
  cellHeight: number;
  dataset: GanttChartDataset<DATASET>[];
  fixedLeft: boolean;
  fixedLeftSize: number;
}

function HeaderColumns<DATASET extends object>({
  headerColumns,
  headerCellHeight,
  cellHeight,
  dataset,
  fixedLeft,
  fixedLeftSize,
}: HeaderColumnsInterface<DATASET>) {
  const patchedHeaderColumns = React.useMemo(
    () =>
      headerColumns.map((column) => ({
        ...column,
        cellRenderer: column.cellRenderer ? React.memo(column.cellRenderer) : undefined,
        headerCellRenderer: React.memo(column.headerCellRenderer),
      })),
    [headerColumns],
  );

  return (
    <>
      {patchedHeaderColumns.map((column, columnIndex) => {
        const Renderer = column.headerCellRenderer;
        const cellWidth = column.width - 1;
        return (
          <Column key={columnIndex} className={`column_${columnIndex}`} width={column.width} fixedLeft={fixedLeft}>
            <HeaderCellRenderer
              Renderer={Renderer}
              width={cellWidth}
              height={headerCellHeight}
              fixedLeftSize={fixedLeftSize}
            />
            {dataset.map((row, rowIndex) => {
              const Renderer = column.cellRenderer;
              const mode = row.__mode ?? "default";
              return (
                <Cell
                  key={row.id}
                  width={cellWidth}
                  height={cellHeight}
                  href={row.__href}
                  disabled={row.__disabled}
                  mode={mode}
                  onClick={row.__onClick}
                >
                  {Renderer && <Renderer {...row} __columnIndex={columnIndex} __rowIndex={rowIndex} __mode={mode} />}
                </Cell>
              );
            })}
          </Column>
        );
      })}
    </>
  );
}

export default React.memo(HeaderColumns) as <DATASET extends object>(
  props: HeaderColumnsInterface<DATASET>,
) => React.ReactNode;
