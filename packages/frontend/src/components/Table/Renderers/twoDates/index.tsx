import React from "react";
import { Typography } from "antd";
import { DateTime } from "luxon";
import cn from "classnames";
import { DateMode } from "@worksolutions/utils";

import { TableCellRenderer } from "../../renderer-types";
import RendererWrapper from "../_wrapper";
import { useTableContext } from "../../context";

import { textColorStyleVariants, textStyles, wrapperStyles } from "./style.css";

export type TableTwoDatesCellDataset = {
  one: Date | null;
  two: Date | null;
  oneError?: boolean;
  twoError?: boolean;
};

export type TableTwoDatesCellOptionsRenderer = { format: DateMode };
export type TableTwoDatesCellRenderer = TableCellRenderer<TableTwoDatesCellDataset, TableTwoDatesCellOptionsRenderer>;

const TwoDatesRenderer: TableTwoDatesCellRenderer = function (props) {
  const { intlDate } = useTableContext();
  return (
    <RendererWrapper {...props} icon={undefined}>
      {props.value && (
        <div className={wrapperStyles}>
          <Typography.Text className={cn(textStyles, props.value.oneError && textColorStyleVariants.error)}>
            {props.value.one ? intlDate.formatDate(DateTime.fromJSDate(props.value.one), props.format) : "—"}
          </Typography.Text>
          <Typography.Text className={cn(textStyles, props.value.twoError && textColorStyleVariants.error)}>
            {props.value.two ? intlDate.formatDate(DateTime.fromJSDate(props.value.two), props.format) : "—"}
          </Typography.Text>
        </div>
      )}
    </RendererWrapper>
  );
};

export default React.memo(TwoDatesRenderer);
