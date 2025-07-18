import { style, styleVariants } from "@vanilla-extract/css";
import { padding } from "polished";

export const wrapperStyles = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
  ...padding(8, 16),
  flex: 1,
  maxWidth: "100%",
});

export const textStyles = style({
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
});

export const textModeStyleVariants = styleVariants({
  default: {},
  alarm: { color: "var(--ant-color-error-text) !important" },
});

export const indicatorsWrapperStyles = style({
  display: "flex",
  alignItems: "center",
  gap: 4,
});

export const tooltipStyles = style({
  whiteSpace: "pre-wrap",
});
