import { globalStyle } from "@vanilla-extract/css";

import { tableStyles } from "./table.css";

globalStyle(`${tableStyles} td.ant-table-column-sort`, {
  backgroundColor: "inherit",
});
