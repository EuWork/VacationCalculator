import { style, styleVariants } from "@vanilla-extract/css";

export const titleStyles = style({
  vars: {
    "--ant-typography-title-margin-top": "unset !important",
    "--ant-typography-title-margin-bottom": "unset !important",
  },
});

export const spanStyleVariants = styleVariants({
  "span-2": { vars: { "--ant-font-size": "12px" } },
});

export const maxRowsStyles = style({
  display: "-webkit-box !important",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

export const maxRowsStyleVariants = styleVariants({
  1: { WebkitLineClamp: 1 },
  2: { WebkitLineClamp: 2 },
  3: { WebkitLineClamp: 3 },
});
