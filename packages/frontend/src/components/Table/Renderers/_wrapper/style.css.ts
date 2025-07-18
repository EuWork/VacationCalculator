import { style, styleVariants } from "@vanilla-extract/css";

export const wrapperStyles = style({
  display: "flex",
  gap: 8,
  alignItems: "center",
  height: "100%",
});

export const wrapperAlignStyleVariants = styleVariants({
  left: { justifyContent: "flex-start" },
  start: { justifyContent: "flex-start" },
  right: { justifyContent: "flex-end" },
  end: { justifyContent: "flex-end" },
});

export const wrapperColorStyleVariants = styleVariants({
  error: { color: "var(--ant-color-error-text)" },
});

export const wrapperWithTooltipStyles = style({
  cursor: "pointer",
});
