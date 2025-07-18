import { globalStyle, style, styleVariants } from "@vanilla-extract/css";

export const wrapperStyles = style({
  display: "flex",
  alignItems: "center",
  gap: 6,
  borderRadius: 4,
  height: 24,
  cursor: "pointer",
});

globalStyle(`${wrapperStyles}:hover`, {
  background: "var(--ant-color-bg-container-disabled)",
});

export const fileIconStyles = style({
  width: 22,
  height: 22,
  padding: 2,
  color: "var(--ant-color-text-description)",
  flexShrink: 0,
});

export const fileNameStyles = style({
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
  display: "inline-block !important",
  flex: 1,
});

export const fileNameStatusStyleVariants = styleVariants({
  uploading: {
    color: "var(--ant-color-text-description) !important",
  },
  uploaded: {
    color: "var(--ant-color-primary) !important",
  },
  error: {
    color: "var(--ant-color-error) !important",
  },
});

export const progressStyles = style({
  width: 70,
  flexShrink: 0,
  margin: "0 !important",
});

export const deleteButtonStyles = style({ display: "none" });

globalStyle(`${wrapperStyles}:hover ${deleteButtonStyles}`, { display: "inline-block" });
