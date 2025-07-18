import { Typography } from "antd";
import { DateTime } from "luxon";
import { capitalizeFirstStringCharacter, DateMode } from "@worksolutions/utils";
import React from "react";

import { TableCellRenderer } from "../../renderer-types";
import RendererWrapper from "../_wrapper";
import { useTableContext } from "../../context";

export type TableDateCellRendererOptions = { format: DateMode | string };
export type TableDateCellDataset = Date | null;

export type TableDateCellRenderer = TableCellRenderer<TableDateCellDataset, TableDateCellRendererOptions>;

const DateRenderer: TableDateCellRenderer = function (props) {
  const { intlDate } = useTableContext();
  return (
    <RendererWrapper {...props}>
      {props.value && (
        <Typography.Text>
          {capitalizeFirstStringCharacter(intlDate.formatDate(DateTime.fromJSDate(props.value), props.format)!)}
        </Typography.Text>
      )}
    </RendererWrapper>
  );
};

export default React.memo(DateRenderer);
