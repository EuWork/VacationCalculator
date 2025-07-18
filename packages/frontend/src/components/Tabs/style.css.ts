import { globalStyle, style } from "@vanilla-extract/css";

export const tabsStyles = style({ flexShrink: 0 });

globalStyle(`${tabsStyles} .ant-tabs-nav-operations`, {
  display: "none !important",
});
