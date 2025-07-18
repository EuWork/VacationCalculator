import { globalStyle, style } from "@vanilla-extract/css";

export const wrapperStyles = style({
  display: "flex",
  flexDirection: "column",
});

export const cardStyles = style({
  width: "100%",
  height: "100%",
});

globalStyle(`${cardStyles} .ant-card-body`, {
  display: "flex",
  flexDirection: "column",
  height: "100%",
});
