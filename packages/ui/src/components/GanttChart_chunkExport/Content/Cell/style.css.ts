import { globalStyle, style, styleVariants } from "@vanilla-extract/css";

export const wrapperStyles = style({
  borderBottom: "1px solid var(--ant-color-border-secondary)",
  flexShrink: 0,
  display: "flex",
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
});

globalStyle(`${wrapperDisabledStyles} > *`, { opacity: 0.3 });

export const wrapperModeStyleVariants = styleVariants({
  default: {
    background: "var(--ant-color-bg-base)",
  },
  alarm: {
    background: "var(--ant-color-error-bg)",
  },
});
