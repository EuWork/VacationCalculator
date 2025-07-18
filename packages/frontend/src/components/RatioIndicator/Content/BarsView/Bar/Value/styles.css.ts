import { style, styleVariants } from "@vanilla-extract/css";

export const valueStyles = style({
  position: "absolute",
});

export const valueStyleVariants = styleVariants({
  top: {
    top: -2,
  },
  bottom: {
    top: 12,
  },
  equal: {
    top: 2,
  },
});

export const valueTextStyleVariants = styleVariants({
  beforeMid: {
    transform: "translateX(8px)",
  },
  afterMid: {
    transform: "translateX(calc(-100% - 6px))",
  },
});

export const valueTextStyles = style({
  wordBreak: "normal",
});

export const valueWithTooltipStyles = style({ cursor: "pointer" });
