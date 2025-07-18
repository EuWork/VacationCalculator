import { style } from "@vanilla-extract/css";

export const wrapperStyles = style({
  position: "absolute",
  bottom: 0,
  width: 2,
  background: "var(--ant-color-primary)",
  opacity: 0.3,
  zIndex: 1,
  transform: "translateX(-50%)",
});
