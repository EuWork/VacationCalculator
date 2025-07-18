import React from "react";
import cn from "classnames";

import GanttCellIndicator, { GanttCellIndicatorInterface } from "../CellIndicator";

import { wrapperStyles } from "./style.css";

export type GanttDefaultValueIndicatorRendererInterface = GanttCellIndicatorInterface;

function GanttDefaultValueIndicatorRenderer({ className, ...props }: GanttDefaultValueIndicatorRendererInterface) {
  return (
    <div className={cn(className, wrapperStyles)}>
      <GanttCellIndicator {...props} />
    </div>
  );
}

export default React.memo(GanttDefaultValueIndicatorRenderer);
