import { style } from "@vanilla-extract/css";

export const wrapperStyles = style({
  display: "flex",
  flexDirection: "column",
  gap: 4,
});

export const inputErrorStyles = style({
  vars: {
    "--ant-color-border": "var(--ant-color-error) !important",
  },
});

export const errorTextStyles = style({
  color: "var(--ant-color-error) !important",
});
