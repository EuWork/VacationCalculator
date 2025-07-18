import { globalStyle, style } from "@vanilla-extract/css";

export const wrapperStyles = style({
  display: "flex",
  flexDirection: "column",
});

export const selectItemStyles = style({});

globalStyle(`${selectItemStyles}.ant-select-item-option-selected .ant-select-item-option-content`, {
  paddingRight: "12px !important",
});

globalStyle(`${wrapperStyles} .ant-select-selection-placeholder`, {
  insetInlineEnd: "calc(var(--ant-padding-sm) + 12px) !important",
});

export const nullValueSelectStyles = style({});

globalStyle(`${nullValueSelectStyles} .ant-select-selection-item`, {
  color: "var(--ant-color-text-placeholder) !important",
});
