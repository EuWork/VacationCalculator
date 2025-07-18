import { style } from "@vanilla-extract/css";

export const pageStyles = style({
  position: "relative",
});

export const contentStyles = style({
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
});
