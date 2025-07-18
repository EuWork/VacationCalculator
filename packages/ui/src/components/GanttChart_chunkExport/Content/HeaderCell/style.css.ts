import { style } from "@vanilla-extract/css";

export const cellStyles = style({
  borderTop: "1px solid var(--ant-color-border-secondary)",
  borderRight: "1px solid var(--ant-color-border-secondary)",
  borderBottom: "none",
  boxShadow: `\
0px 2px 4px 0px rgba(0, 0, 0, 0.02),\
0px 1px 6px -1px rgba(0, 0, 0, 0.02),\
0px 1px 2px 0px rgba(0, 0, 0, 0.03)`,
  position: "sticky",
  top: 0,
  zIndex: 2,
});
