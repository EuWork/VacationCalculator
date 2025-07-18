import { style } from "@vanilla-extract/css";

export const addPeriodStyles = style({
  display: "flex",
  gap: 12,
  alignItems: "center",
});

export const periodItemStyles = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
});

export const periodStyles = style({
  display: "flex",
  flexDirection: "column",
  gap: 4,
});
