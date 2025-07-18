import { globalStyle, style, styleVariants } from "@vanilla-extract/css";

export const tooltipStyles = style({});

globalStyle(`${tooltipStyles} .ant-tooltip-inner`, {
  whiteSpace: "pre-wrap !important",
});

export const tooltipMaxWidthStyleVariants = styleVariants({
  unset: { maxWidth: "unset !important" },
  250: { maxWidth: "250px !important" },
});

export const tooltipTextAlignStyleVariants = styleVariants({
  left: {},
  center: {},
  right: {},
});

globalStyle(`${tooltipTextAlignStyleVariants.center} .ant-tooltip-inner`, { textAlign: "center !important" as any });
globalStyle(`${tooltipTextAlignStyleVariants.right} .ant-tooltip-inner`, { textAlign: "right !important" as any });
