import React from "react";
import { Typography } from "antd";
import { stopPropagation } from "@worksolutions/react-utils";

import RendererWrapper from "../_wrapper";
import { TableCellRenderer } from "../../renderer-types";

import { textStyles } from "./style.css";

export type TableFakeLinkCellDataset = {
  text: React.ReactNode;
  onClick: () => void;
};

export type TableFakeLinkCellRenderer = TableCellRenderer<TableFakeLinkCellDataset>;

const FakeLinkRenderer: TableFakeLinkCellRenderer = function (props) {
  return (
    <RendererWrapper {...props}>
      {props.value && (
        <Typography.Link className={textStyles} onClickCapture={stopPropagation(props.value.onClick)}>
          {props.value.text}
        </Typography.Link>
      )}
    </RendererWrapper>
  );
};

export default React.memo(FakeLinkRenderer);
