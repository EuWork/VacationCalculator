import React from "react";
import cn from "classnames";

import { GanttChartHeaderColumn } from "../../types";
import { AbsolutePositionCalculator } from "../_absolutePositionCalculator";
import { useVisible } from "../../_common/useVisible";

import { wrapperDisabledStyles, wrapperPointerStyles, wrapperStyles, wrapperVisibleStyles } from "./style.css";

type CellValueInterface = {
  fixedHeaderColumns: GanttChartHeaderColumn<any>[];
  headerColumns: GanttChartHeaderColumn<any>[];
  headerHeight: number;
  cellHeight: number;
  rowIndex: number;
  children: React.ReactNode;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
} & ({ type: "interval"; start: number; end: number } | { type: "position"; start: number; end?: never });

function CellValue({
  fixedHeaderColumns,
  headerHeight,
  cellHeight,
  rowIndex,
  headerColumns,
  children,
  type,
  start,
  end,
  href,
  disabled,
  onClick,
}: CellValueInterface) {
  const style = React.useMemo(() => {
    const calculator = new AbsolutePositionCalculator(
      fixedHeaderColumns,
      headerColumns,
      headerHeight,
      cellHeight,
      rowIndex,
      type === "interval" ? { type, start, end } : { type, start },
    );
    const results = calculator.calculate();
    if (results.type === "interval")
      return { left: results.left + "px", width: results.width + "px", top: results.top + "px" };
    if (results.type === "position") return { left: results.left + "px", top: results.top + "px" };
  }, [cellHeight, end, fixedHeaderColumns, headerColumns, headerHeight, rowIndex, start, type]);

  const [visible, setElement] = useVisible(false);

  const resultClassName = cn(
    wrapperStyles,
    visible && wrapperVisibleStyles,
    onClick && wrapperPointerStyles,
    disabled && wrapperDisabledStyles,
  );

  if (href && !disabled)
    return (
      <a ref={setElement} style={style} className={resultClassName} href={href} onClick={onClick}>
        {children}
      </a>
    );

  return (
    <div ref={setElement} style={style} className={resultClassName} onClick={onClick}>
      {children}
    </div>
  );
}

export default React.memo(CellValue);
