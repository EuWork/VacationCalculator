import { ComplexStyleRule, globalStyle, style } from "@vanilla-extract/css";

const sizeRule: ComplexStyleRule = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
};

const heightRule: ComplexStyleRule = {
  height: "100%",
};

export const flexFullHeightStyles = style({ height: 0, ...sizeRule });

globalStyle(
  `\
${flexFullHeightStyles} .ant-spin-nested-loading, \
${flexFullHeightStyles} .ant-spin-container, \
${flexFullHeightStyles} .ant-table, \
${flexFullHeightStyles} .ant-table-container, \
${flexFullHeightStyles} .ant-table-body`,
  sizeRule,
);

globalStyle(
  `\
${flexFullHeightStyles} .ant-table-tbody, \
${flexFullHeightStyles} .ant-table-tbody-virtual-holder, \
${flexFullHeightStyles} .ant-table-placeholder, \
${flexFullHeightStyles} .ant-table-placeholder > *, \
${flexFullHeightStyles} .ant-table-placeholder > * > *`,
  heightRule,
);

globalStyle(`${flexFullHeightStyles} .ant-table-body:has(table):has(.ant-table-tbody):has(.ant-table-placeholder)`, {
  overflow: "hidden !important",
  ...sizeRule,
});

globalStyle(
  `${flexFullHeightStyles} .ant-table-body table:has(.ant-table-tbody):has(.ant-table-placeholder)`,
  heightRule,
);
