import React from "react";

import HeaderCell from "../HeaderCell";
import { GanttChartHeaderCellRenderer } from "../../types";

interface HeaderCellRendererInterface {
  Renderer: GanttChartHeaderCellRenderer;
  width: number;
  height: number;
  fixedLeftSize: number;
}

function HeaderCellRenderer({ width, height, fixedLeftSize, Renderer }: HeaderCellRendererInterface) {
  return (
    <HeaderCell width={width} height={height} mode="default">
      <Renderer fixedLeft={fixedLeftSize} />
    </HeaderCell>
  );
}

export default React.memo(HeaderCellRenderer);
