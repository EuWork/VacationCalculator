import React from "react";
import { isNil } from "@worksolutions/utils";

import Typography, { TypographyInterface } from "components/Typography";

import { TableCellRenderer } from "../../renderer-types";
import RendererWrapper from "../_wrapper";

import { textStyles } from "./style.css";

export type TableTextCellDataset = string | number;

export type TableTextCellRendererOptions = { maxRows?: TypographyInterface["maxRows"] };
export type TableTextCellRenderer = TableCellRenderer<TableTextCellDataset, TableTextCellRendererOptions>;

const TextRenderer: TableTextCellRenderer = function (props) {
  return (
    <RendererWrapper {...props}>
      {!isNil(props.value) && (
        <Typography className={textStyles} maxRows={props.maxRows}>
          {props.value}
        </Typography>
      )}
    </RendererWrapper>
  );
};

export default React.memo(TextRenderer);
