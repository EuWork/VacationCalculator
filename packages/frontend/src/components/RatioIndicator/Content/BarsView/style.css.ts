import { style } from "@vanilla-extract/css";
import { padding } from "polished";

export const wrapperStyles = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const barsWrapperStyles = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "52px",
});

export const legendStyles = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "20px",
});

export const barsWrapperWithLegendStyles = style({
  ...padding(0, 12),
});
