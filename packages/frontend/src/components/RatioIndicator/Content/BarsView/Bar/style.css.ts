import { createVar, style, styleVariants } from "@vanilla-extract/css";

export const barBackgroundColor = createVar();

export const barStyles = style({
  position: "relative",
  width: 2,
  borderRadius: 50,
  backgroundColor: barBackgroundColor,
  transformOrigin: "center",
});

export const wrapperStyles = style({
  display: "flex",
  flexDirection: "column",
  margin: "auto",
  position: "relative",
});

export const wrapperStyleVariants = styleVariants({
  bar: {
    height: 12,
  },
  value: {
    height: 32,
  },
  equal: {
    height: 22,
  },
});

export const equalStyleVariants = styleVariants({
  top: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  bottom: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
});

export const wrapperTransformStyleVariants = styleVariants({
  top: {
    transform: "translateY(-10px)",
  },
  bottom: {
    transform: "translateY(10px)",
  },
});

export const wrapperOpacityStyles = style({
  opacity: 0.4,
});
