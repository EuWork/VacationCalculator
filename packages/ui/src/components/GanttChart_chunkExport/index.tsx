import React, { Fragment } from "react";
import cn from "classnames";

import { Scroll } from "components/Scroll";
import { GetScrollProvider } from "components/ScrollProvider";

import { GanttChartDataset, GanttChartHeaderColumn } from "./types";
import CurrentValue from "./Content/CurrentValue";
import CellValue from "./Content/CellValue";
import HeaderColumns from "./Content/HeaderColumns";
import { useGanttScroll } from "./_common/useGanttScroll";
import { AbsolutePositionCalculator } from "./Content/_absolutePositionCalculator";

import { innerContentStyles, outerScrollStyles, wrapperStyles } from "./style.css";

export interface GanttChartInterface<DATASET extends object> {
  className?: string;
  headerCellHeight: number;
  cellHeight: number;
  fixedHeaderColumns?: GanttChartHeaderColumn<DATASET>[];
  headerColumns: GanttChartHeaderColumn<DATASET>[];
  dataset: GanttChartDataset<DATASET>[];
  currentValue?: number;
  autoScrollToCurrentValue?: boolean;
}

const defaultFixedHeaderColumns: GanttChartHeaderColumn<any>[] = [];

function GanttChart<DATASET extends object>({
  className,
  headerCellHeight,
  cellHeight,
  fixedHeaderColumns = defaultFixedHeaderColumns,
  headerColumns,
  dataset,
  currentValue,
  autoScrollToCurrentValue,
}: GanttChartInterface<DATASET>) {
  const [setScrollProvider] = useGanttScroll(headerColumns, fixedHeaderColumns, currentValue, autoScrollToCurrentValue);
  const fixedLeftSize = React.useMemo(
    () => AbsolutePositionCalculator.getFixedLeft(fixedHeaderColumns),
    [fixedHeaderColumns],
  );

  return (
    <Scroll className={cn(className, outerScrollStyles)}>
      <GetScrollProvider onScrollProvider={setScrollProvider} />
      <div className={wrapperStyles}>
        <HeaderColumns
          headerColumns={fixedHeaderColumns}
          headerCellHeight={headerCellHeight}
          cellHeight={cellHeight}
          dataset={dataset}
          fixedLeft
          fixedLeftSize={0}
        />
        <div className={innerContentStyles}>
          <HeaderColumns
            headerColumns={headerColumns}
            headerCellHeight={headerCellHeight}
            cellHeight={cellHeight}
            dataset={dataset}
            fixedLeft={false}
            fixedLeftSize={fixedLeftSize}
          />
          {dataset.map((row, rowIndex) => (
            <Fragment key={row.id}>
              {row.__cellValues?.map(({ element, ...cellValue }, key) => (
                <CellValue
                  key={key}
                  fixedHeaderColumns={fixedHeaderColumns}
                  headerColumns={headerColumns}
                  headerHeight={headerCellHeight}
                  cellHeight={cellHeight}
                  rowIndex={rowIndex}
                  href={row.__href}
                  disabled={row.__disabled}
                  onClick={row.__onClick}
                  {...cellValue}
                >
                  {element}
                </CellValue>
              ))}
            </Fragment>
          ))}
        </div>
        {currentValue !== undefined && (
          <CurrentValue
            fixedHeaderColumns={fixedHeaderColumns}
            headerColumns={headerColumns}
            currentValue={currentValue}
            headerHeight={headerCellHeight}
          />
        )}
      </div>
    </Scroll>
  );
}

const MemoGanttChart = React.memo(GanttChart) as typeof GanttChart;

export { MemoGanttChart as GanttChart };

export * from "./types";

export * from "./CommonComponent";
