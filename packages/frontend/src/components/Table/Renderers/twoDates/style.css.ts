import { style, styleVariants } from "@vanilla-extract/css";

export const wrapperStyles = style({
  display: "flex",
  flexDirection: "column",
});

export const textStyles = style({
  whiteSpace: "nowrap",
});

export const textColorStyleVariants = styleVariants({
  error: { color: "var(--ant-color-error-text)" },
});
