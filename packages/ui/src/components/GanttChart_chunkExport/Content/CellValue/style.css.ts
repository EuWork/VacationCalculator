import { style } from "@vanilla-extract/css";

export const wrapperStyles = style({
  position: "absolute",
  visibility: "hidden",
});

export const wrapperVisibleStyles = style({
  visibility: "visible",
});

export const wrapperPointerStyles = style({
  cursor: "pointer",
});

export const wrapperDisabledStyles = style({
  cursor: "default",
  opacity: 0.3,
});
