import { ThemeConfig } from "antd";
import { mergeDeepRight } from "@worksolutions/utils";

const commonTheme: Partial<Theme> = {
  cssVar: true,
  token: {
    fontFamily: "Roboto, sans-serif",
    fontSize: 14,
    fontSizeSM: 12,
    fontSizeLG: 16,
  },
};

export type Theme = ThemeConfig;

export function createTheme(theme: Theme): Theme {
  return mergeDeepRight(commonTheme, theme);
}
