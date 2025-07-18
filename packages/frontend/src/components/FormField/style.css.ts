import { globalStyle, style } from "@vanilla-extract/css";

export const wrapperStyles = style({
  display: "flex",
  flexDirection: "column",
});

globalStyle(`${wrapperStyles} > *`, { width: "100%" });

export const wrapperErrorStyles = style({});

globalStyle(
  `\
${wrapperErrorStyles} .ant-input-number, \
${wrapperErrorStyles} .ant-select-outlined, \
${wrapperErrorStyles} .ant-input-outlined\
`,
  {
    vars: {
      "--ant-color-border": "var(--ant-color-error) !important",
    },
  },
);

export const titleStyles = style({
  marginBottom: 4,
  color: "var(--ant-color-text-secondary) !important",
});

export const titleReqStyles = style({
  color: "var(--ant-color-error) !important",
  marginRight: 4,
});

export const hintStyles = style({
  marginTop: 2,
  color: "var(--ant-color-text-description) !important",
});

export const errorStyles = style({
  fontSize: 12,
  marginTop: 2,
  color: "var(--ant-color-error-text) !important",
});
