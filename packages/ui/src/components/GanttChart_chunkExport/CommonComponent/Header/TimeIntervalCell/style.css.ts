import { style } from "@vanilla-extract/css";
import { padding } from "polished";

export const wrapperStyles = style({
  ...padding(2, 8),
  display: "flex",
  flexDirection: "column",
  flex: 1,
});

export const dateStyles = style({
  width: "fit-content",
  position: "sticky",
});

export const hoursListWrapperStyles = style({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
});

export const hourTextStyles = style({
  whiteSpace: "nowrap",
});

export const hourTextActiveStyles = style({
  color: "var(--ant-color-primary) !important",
});
