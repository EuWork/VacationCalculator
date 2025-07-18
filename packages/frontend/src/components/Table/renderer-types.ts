import React from "react";

import { TableAlignment } from "./types";

export type TableCellRendererProps<VALUE, OPTIONS = {}> = {
  value: VALUE | null | undefined;
  error: boolean | undefined;
  tooltip: string | undefined;
  icon: React.JSX.Element | null | undefined;
  alignment: TableAlignment | undefined;
} & OPTIONS;

export type TableCellRenderer<VALUE, OPTIONS = {}> = ((
  props: TableCellRendererProps<VALUE, OPTIONS>,
) => React.ReactNode) & { defaultWidth?: number };
