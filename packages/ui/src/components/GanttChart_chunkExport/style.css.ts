import { style } from "@vanilla-extract/css";

export const outerScrollStyles = style({
  width: "100%",
  height: "100%",
  overflow: "scroll",
});

export const wrapperStyles = style({
  display: "flex",
  position: "relative",
  width: "fit-content",
  height: "fit-content",
});

export const innerContentStyles = style({
  display: "flex",
});
