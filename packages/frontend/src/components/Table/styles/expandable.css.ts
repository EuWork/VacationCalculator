import { globalStyle, style } from "@vanilla-extract/css";

import { tableStyles } from "./table.css";

export const tableRowExpandableStyles = style({
  backgroundColor: "var(--ant-table-header-bg)",
});

globalStyle(`${tableStyles} .ant-table-tbody .ant-table-row:not(${tableRowExpandableStyles})`, {
  backgroundColor: "var(--ant-color-bg-container)",
});

globalStyle(
  `\
${tableStyles} .ant-table-tbody \
.ant-table-row:not(.ant-table-row-selected) \
.ant-table-cell-fix-left:not(.ant-table-cell-row-hover)`,
  {
    backgroundColor: "inherit",
  },
);
