import { globalStyle, style } from "@vanilla-extract/css";

export const lightStyles = style({});
export const darkStyles = style({});

globalStyle(":root.ant-theme-light " + darkStyles, { display: "none" });
globalStyle(":root.ant-theme-dark " + lightStyles, { display: "none" });
