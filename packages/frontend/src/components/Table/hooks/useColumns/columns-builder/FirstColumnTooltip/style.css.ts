import { globalStyle, style } from "@vanilla-extract/css";

import { tableStyles } from "components/Table/styles/table.css";

export const tooltipTriggerStyles = style({
  position: "absolute",
  left: 0,
  top: 0,
  height: "100%",
  width: 8,
  cursor: "pointer",
});

globalStyle(`${tableStyles} .ant-table-row > .ant-table-selection-column + * ${tooltipTriggerStyles}`, {
  left: -32,
});
