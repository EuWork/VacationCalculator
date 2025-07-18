import { style } from "@vanilla-extract/css";
import { padding } from "polished";

export const wrapperStyles = style({
  ...padding(12, 16),
  flex: 1,
  gap: 8,
  display: "flex",
  alignItems: "center",
});
