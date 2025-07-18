import { theme } from "antd";
import { createTheme } from "@app/ui";

export const lightTheme = createTheme({
  token: {
    colorPrimary: "#D6A45E",
  },
  components: {
    Typography: {
      fontWeightStrong: 500,
    },
    Table: {
      cellPaddingInline: 12,
    },
  },
});

export const darkTheme = createTheme({
  ...lightTheme,
  algorithm: theme.darkAlgorithm,
});
