import { style } from "@vanilla-extract/css";
import { padding } from "polished";

export const wrapperStyles = style({
  ...padding(2, 8),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
});

export const timeStyles = style({
  width: "fit-content",
  position: "sticky",
  textAlign: "center !important" as any,
});
