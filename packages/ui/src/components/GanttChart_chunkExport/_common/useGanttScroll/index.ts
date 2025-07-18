import React from "react";

import { ScrollProviderContextInterface } from "components/ScrollProvider";

import { GanttChartHeaderColumn } from "../../types";
import { useAutoScroll } from "./useAutoScroll";
import { useDrag } from "./useDrag";

export function useGanttScroll(
  headerColumns: GanttChartHeaderColumn<any>[],
  fixedHeaderColumns: GanttChartHeaderColumn<any>[],
  currentValue: number | undefined,
  autoScrollToCurrentValue: boolean | undefined,
) {
  const [scrollProvider, setScrollProvider] = React.useState<ScrollProviderContextInterface | null>(null);
  useAutoScroll(scrollProvider, headerColumns, fixedHeaderColumns, currentValue, autoScrollToCurrentValue);
  useDrag(scrollProvider);
  return [setScrollProvider] as const;
}
