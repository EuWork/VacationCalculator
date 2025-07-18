import React from "react";

import { scrollToElement } from "libs";

import { ScrollProviderContextInterface } from "components/ScrollProvider";

import { GanttChartHeaderColumn } from "../../types";
import { innerContentStyles } from "../../style.css";

export function useAutoScroll(
  scrollProvider: ScrollProviderContextInterface | null,
  headerColumns: GanttChartHeaderColumn<any>[],
  fixedHeaderColumns: GanttChartHeaderColumn<any>[],
  currentValue: number | undefined,
  autoScrollToCurrentValue: boolean | undefined,
) {
  React.useEffect(() => {
    if (!autoScrollToCurrentValue || currentValue === undefined) return;
    if (!scrollProvider || scrollProvider.scrollableElement === window) return;
    const column = getColumnToScroll(scrollProvider, headerColumns, currentValue);
    if (!column) return;
    const fixedWidth = fixedHeaderColumns.reduce((acc, column) => acc + column.width, 0);
    const timer = setTimeout(() => {
      scrollToElement(
        scrollProvider.scrollableElement,
        { mode: "left", scrollToElement: column, padding: -fixedWidth },
        "smooth",
      );
    }, 100);
    return () => clearTimeout(timer);
  }, [autoScrollToCurrentValue, currentValue, fixedHeaderColumns, headerColumns, scrollProvider]);
}

function getColumnToScroll(
  scrollProvider: ScrollProviderContextInterface,
  headerColumns: GanttChartHeaderColumn<any>[],
  currentValue: number,
) {
  const columnOverThanCurrentValueIndex = headerColumns.findIndex(
    (column) => column.value !== undefined && column.value > currentValue,
  );
  if (columnOverThanCurrentValueIndex === -1) return null;
  const columnIndex = columnOverThanCurrentValueIndex - 1;
  return (scrollProvider.scrollableElement as HTMLElement).querySelector(
    `.${innerContentStyles} .column_${columnIndex}`,
  ) as HTMLElement | null;
}
