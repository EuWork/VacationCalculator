import { globalStyle, style } from "@vanilla-extract/css";

export const tableVirtualStyles = style({});

globalStyle(`${tableVirtualStyles} .ant-table-tbody .ant-table-selection-column`, {
  width: "unset !important",
  display: "flex",
});

globalStyle(`${tableVirtualStyles} .ant-table-header`, {
  flexShrink: 0,
});
