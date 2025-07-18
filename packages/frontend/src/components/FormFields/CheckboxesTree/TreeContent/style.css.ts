import { globalStyle, style } from "@vanilla-extract/css";

export const treeStyles = style({
  height: "100%",
});

export const hideExpandableButtonStyles = style({});

globalStyle(`${hideExpandableButtonStyles} .ant-tree-switcher`, {
  display: "none !important",
});
