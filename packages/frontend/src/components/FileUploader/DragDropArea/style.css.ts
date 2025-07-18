import { globalStyle, style, styleVariants } from "@vanilla-extract/css";

export const wrapperStyles = style({
  borderRadius: 16,
  display: "flex",
  flexDirection: "column",
  gap: 4,
  background: "var(--ant-color-bg-container-disabled)",
  border: "1px dashed var(--ant-color-border)",
  alignItems: "center",
  cursor: "pointer",
});

export const wrapperErrorStyles = style({
  borderColor: "var(--ant-color-error)",
});

export const wrapperSizeStyleVariants = styleVariants({
  default: {
    borderRadius: 16,
    padding: 16,
  },
  small: {
    borderRadius: 12,
    padding: 6,
  },
});

export const iconStyles = style({
  padding: 4,
  width: 48,
  height: 48,
  color: "var(--ant-color-primary) !important",
});

globalStyle(`${iconStyles} svg`, {
  width: 40,
  height: 40,
});
export const textStyles = style({
  textAlign: "center",
});

export const requiredTextStyles = style({
  marginRight: 4,
});
