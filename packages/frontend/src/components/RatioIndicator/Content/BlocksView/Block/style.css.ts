import { createVar, style, styleVariants } from "@vanilla-extract/css";

export const blockWidth = createVar();
export const blockBackground = createVar();
export const emptyBackgroundColor = createVar();

export const blockStyles = style({
  width: blockWidth,
  height: 32,
  textAlign: "center",
  lineHeight: "32px",
  display: "inline-block",
  position: "relative",
  background: blockBackground,
  minWidth: 34,
});

export const blockStyleVariants = styleVariants({
  firstBlock: {
    borderRadius: "4px 0 0 4px",
  },
  lastBlock: {
    borderRadius: "0 4px 4px 0",
  },
});

export const blockTooltipStyles = style({
  cursor: "pointer",
});

export const circleStyles = style({
  position: "absolute",
  width: 5,
  height: 5,
  backgroundColor: emptyBackgroundColor,
  borderRadius: "50%",
});

export const circleStyleVariants = styleVariants({
  top: {
    top: -2.5,
    left: -2.5,
  },
  bottom: {
    bottom: -2.5,
    left: -2.5,
  },
});

export const circleExternalStyles = style({
  display: "none",
});

export const emptySpaceStyles = style({
  position: "absolute",
  top: "50%",
  width: 1,
  height: 12,
  backgroundColor: emptyBackgroundColor,
  transform: "translate(-50%, -50%)",
  borderRadius: 2,
});

export const emptySpaceFirstBlockStyles = style({
  display: "none",
});
