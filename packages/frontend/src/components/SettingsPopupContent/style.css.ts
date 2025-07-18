import { style } from "@vanilla-extract/css";
import { padding } from "polished";

export const wrapperStyles = style({
  display: "flex",
  flexDirection: "column",
  padding: 8,
  background: "var(--ant-color-bg-container)",
});

export const contentWrapperStyles = style({
  display: "flex",
  flexDirection: "column",
  height: 0,
  flex: 1,
});

export const actionsWrapperStyles = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: 8,
  ...padding(8, 12),
  margin: -8,
  marginTop: 8,
  borderTop: "1px solid var(--ant-color-border-secondary)",
});
