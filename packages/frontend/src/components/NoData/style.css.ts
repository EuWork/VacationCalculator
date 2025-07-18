import { style } from "@vanilla-extract/css";
import { padding } from "polished";

export const wrapperStyles = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  ...padding(32, null),
});

export const iconStyles = style({
  width: 126,
  height: 80,
});

export const titleStyles = style({
  textAlign: "center",
  marginTop: 8,
  marginBottom: "0 !important",
});

export const descriptionStyles = style({
  marginTop: 4,
  color: "var(--ant-color-text-secondary)",
  textAlign: "center",
  whiteSpace: "pre-line",
});
