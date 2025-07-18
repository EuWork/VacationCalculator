import { style } from "@vanilla-extract/css";
import { padding } from "polished";

import { createBreakpointTo } from "breakpoint-sizes";

export const contentWrapperStyles = style({
  ...padding(16, 24, 32, 24),
  vars: {
    "--gap-large": "20px",
    "--gap-medium": "12px",
    "--gap-small": "8px",
  },
  "@media": {
    ...createBreakpointTo("desktop", {
      ...padding(16, 24, 32, 24),
      vars: {
        "--gap-large": "16px",
      },
    }),
    ...createBreakpointTo("tablet", {
      ...padding(16, 20, 20, 20),
      vars: {
        "--gap-large": "12px",
        "--gap-medium": "8px",
      },
    }),
  },
});

export const titleStyles = style({
  vars: { "--ant-typography-title-margin-bottom": "0px !important" },
});

export const titleWrapperStyles = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
