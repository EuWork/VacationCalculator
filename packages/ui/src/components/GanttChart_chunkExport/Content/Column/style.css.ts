import { globalStyle, style } from "@vanilla-extract/css";

export const columnStyles = style({
  display: "flex",
  flexDirection: "column",
  width: "fit-content",
  height: "fit-content",
  borderRight: "1px solid var(--ant-color-border-secondary)",
});

globalStyle(`${columnStyles}:last-child`, {
  borderRight: "none",
});

export const columnFixedLeftStyles = style({
  position: "sticky",
  left: 0,
  zIndex: 3,
});
