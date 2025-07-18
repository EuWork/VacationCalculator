import { style } from "@vanilla-extract/css";

export const checkboxesTreeStyles = style({
  maxHeight: 300,
  minWidth: 300,
  height: 0,
  flex: 1,
});

export const searchStyles = style({
  marginBottom: 4,
  position: "relative",
  selectors: {
    "&:after": {
      content: "",
      position: "absolute",
      bottom: -8,
      left: -8,
      right: -8,
      background: "var(--ant-color-border-secondary)",
      height: 1,
    },
  },
});

export const scrollStyles = style({
  paddingRight: 8,
  height: 0,
  flex: 1,
});
