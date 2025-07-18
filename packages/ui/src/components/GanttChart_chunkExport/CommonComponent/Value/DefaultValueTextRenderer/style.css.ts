import { style, styleVariants } from "@vanilla-extract/css";
import { padding } from "polished";

export const wrapperStyles = style({
  height: 20,
  borderRadius: 100,
  ...padding(null, 12),
  position: "relative",
  marginTop: 9,
  border: "1px solid",
  transition: "color 0.2s, background 0.2s, border-color 0.2s",
});

export const wrapperSizeStyleVariants = styleVariants({
  none: {
    width: "100%",
  },
  left: {
    marginLeft: 8,
    width: "calc(100% - 9px)",
  },
  right: {
    marginLeft: 1,
    width: "calc(100% - 9px)",
  },
  leftRight: {
    marginLeft: 8,
    width: "calc(100% - 16px)",
  },
});

export const defaultWrapperColorStyleVariants = styleVariants({
  primary: {
    background: "var(--ant-blue-2)",
    borderColor: "transparent",
    color: "var(--ant-blue-9)",
    selectors: {
      "&:hover": {
        background: "var(--ant-blue-4)",
        color: "var(--ant-blue-10)",
      },
    },
  },
  error: {
    background: "var(--ant-color-error)",
    borderColor: "transparent",
    color: "var(--ant-color-bg-base)",
    selectors: {
      "&:hover": {
        background: "var(--ant-color-error-active)",
      },
    },
  },
});

export const dashedWrapperColorStyleVariants = styleVariants({
  primary: {
    background: "transparent",
    borderStyle: "dashed",
    borderColor: "var(--ant-blue-2)",
    color: "var(--ant-blue-9)",
    selectors: {
      "&:hover": {
        borderColor: "var(--ant-blue-4)",
        color: "var(--ant-blue-10)",
      },
    },
  },
  error: {
    borderStyle: "dashed",
    background: "transparent",
    borderColor: "var(--ant-color-error)",
    color: "var(--ant-color-error-text)",
    selectors: {
      "&:hover": {
        borderColor: "var(--ant-color-error-active)",
        color: "var(--ant-color-error-active)",
      },
    },
  },
});

export const textStyles = style({
  textOverflow: "ellipsis",
  overflow: "hidden",
  color: "currentColor !important",
  whiteSpace: "nowrap",
  lineHeight: "18px !important",
  textAlign: "center !important" as any,
});

export const tooltipStyles = style({
  whiteSpace: "pre-wrap",
});
