import { style } from "@vanilla-extract/css";

export const wrapperStyles = style({
  display: "flex",
  gap: 16,
});

export const iconStyles = style({
  color: "var(--ant-color-warning)",
  fontSize: 24,
});

export const titleStyles = style({ fontWeight: "bold !important" });
