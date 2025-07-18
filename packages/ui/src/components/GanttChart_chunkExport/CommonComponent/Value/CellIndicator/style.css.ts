import { globalStyle, style, styleVariants } from "@vanilla-extract/css";

import { boxShadow } from "libs";

export const wrapperStyles = style({
  width: 20,
  height: 20,
  borderRadius: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "var(--ant-color-bg-base)",
  transition: "background 0.2s",
});

export const colorStyleVariants = styleVariants({
  error: {
    backgroundColor: "var(--ant-color-error)",
    selectors: {
      "&:hover": {
        backgroundColor: "var(--ant-color-error-active)",
      },
    },
  },
  warning: {
    backgroundColor: "var(--ant-color-warning)",
    selectors: {
      "&:hover": {
        backgroundColor: "var(--ant-color-warning-active)",
      },
    },
  },
  success: {
    backgroundColor: "var(--ant-color-success)",
    selectors: {
      "&:hover": {
        backgroundColor: "var(--ant-color-success-active)",
      },
    },
  },
  inProgress: {
    backgroundColor: "var(--ant-color-border)",
    selectors: {
      "&:hover": {
        backgroundColor: "var(--ant-color-border-secondary)",
      },
    },
  },
});

globalStyle(`${wrapperStyles} svg`, {
  width: 11,
  height: 11,
});

export const wrapperOutlinedStyles = style({
  boxShadow: boxShadow({ spread: 2, color: "var(--ant-color-bg-base)" }),
});

export const tooltipStyles = style({
  whiteSpace: "pre-wrap",
});
