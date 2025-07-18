import React from "react";

import { GanttChartHeaderColumn } from "../../types";
import { AbsolutePositionCalculator } from "../_absolutePositionCalculator";

import { wrapperStyles } from "./style.css";

interface CurrentValueInterface {
  fixedHeaderColumns: GanttChartHeaderColumn<any>[];
  headerColumns: GanttChartHeaderColumn<any>[];
  currentValue: number;
  headerHeight: number;
}

function CurrentValue({ fixedHeaderColumns, headerHeight, headerColumns, currentValue }: CurrentValueInterface) {
  const style = React.useMemo(() => {
    const calculator = new AbsolutePositionCalculator(fixedHeaderColumns, headerColumns, headerHeight, 0, 0, {
      type: "position",
      start: currentValue,
    });
    const result = calculator.calculate();
    return { left: result.left + "px", top: result.top + "px" };
  }, [currentValue, fixedHeaderColumns, headerColumns, headerHeight]);

  return <div style={style} className={wrapperStyles} />;
}

export default React.memo(CurrentValue);
