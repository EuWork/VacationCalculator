import { globalStyle, style } from "@vanilla-extract/css";

export const overlayStyles = style({});

globalStyle(`${overlayStyles} .ant-popover-inner`, {
  overflow: "hidden !important" as any,
});

export const hiddenStyles = style({
  display: "none",
});
