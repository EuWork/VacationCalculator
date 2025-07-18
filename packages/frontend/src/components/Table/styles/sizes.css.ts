import { globalStyle, styleVariants } from "@vanilla-extract/css";

export const tableSizeStyleVariants = styleVariants({
  default: {},
});

globalStyle(`${tableSizeStyleVariants.default} .ant-table-css-var`, {
  vars: { "--ant-table-cell-padding-block": "14px" },
});
