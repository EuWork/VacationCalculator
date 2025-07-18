import { globalStyle, style } from "@vanilla-extract/css";

export const tableStyles = style({});

globalStyle(`${tableStyles} .ant-table-column-title`, {
  whiteSpace: "pre-wrap",
});

globalStyle(`${tableStyles} .ant-table-tbody .ant-table-cell[colspan]`, {
  zIndex: 1,
});
