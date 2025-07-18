import React from "react";

export type GanttChartCellRenderer<DATASET extends object> = React.FC<
  GanttChartDataset<DATASET> & { __rowIndex: number; __columnIndex: number; __mode: GanttChartDatasetMode }
>;

export type GanttChartHeaderCellRenderer = React.FC<{ fixedLeft: number }>;

export interface GanttChartHeaderColumn<DATASET extends object> {
  value?: number;
  valueWidth?: number;
  width: number;
  headerCellRenderer: GanttChartHeaderCellRenderer;
  cellRenderer?: GanttChartCellRenderer<DATASET>;
}

export type GanttChartDatasetMode = "default" | "alarm";

export type GanttChartDatasetCellValueInterval = {
  type: "interval";
  start: number;
  end: number;
  element: React.ReactNode;
};

export type GanttChartDatasetCellValuePosition = { type: "position"; start: number; element: React.ReactNode };

export type GanttChartDataset<DATASET extends object> = DATASET & {
  id: string;
  __disabled?: boolean;
  __mode?: GanttChartDatasetMode;
  __cellValues?: (GanttChartDatasetCellValueInterval | GanttChartDatasetCellValuePosition)[];
  __onClick?: () => void;
  __href?: string;
};
