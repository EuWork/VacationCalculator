import { globalStyle, styleVariants } from "@vanilla-extract/css";

export const cellStyleVariants = styleVariants({
  error: { backgroundColor: "var(--ant-color-error-bg) !important" },
  success: { backgroundColor: "var(--ant-color-success-bg) !important" },
  warning: { backgroundColor: "var(--ant-color-warning-bg) !important" },
});

export const cellIndicatorStyleVariants = styleVariants({
  error: {},
  success: {},
  warning: {},
});

globalStyle(`.ant-table-row:has(>${cellIndicatorStyleVariants.error}) > :first-child:before`, {
  content: "",
  position: "absolute",
  left: 0,
  top: 0,
  width: 3,
  height: "100%",
  borderLeft: "3px solid var(--ant-color-error)",
});

globalStyle(`.ant-table-row:has(>${cellIndicatorStyleVariants.success}) > :first-child:before`, {
  content: "",
  position: "absolute",
  left: 0,
  top: 0,
  width: 3,
  height: "100%",
  borderLeft: "3px solid var(--ant-color-success)",
});

globalStyle(`.ant-table-row:has(>${cellIndicatorStyleVariants.warning}) > :first-child:before`, {
  content: "",
  position: "absolute",
  left: 0,
  top: 0,
  width: 3,
  height: "100%",
  borderLeft: "3px solid var(--ant-color-warning)",
});
