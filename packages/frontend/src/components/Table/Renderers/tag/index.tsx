import React from "react";

import Tag from "components/Tag";

import { TableCellRenderer } from "../../renderer-types";
import RendererWrapper from "../_wrapper";

export type TableTagCellDataset = {
  text: string;
  value: string;
  icon?: "success" | "warning" | "error" | "minus" | "repair" | true;
  color: "success" | "warning" | "error" | "default";
};
export type TableTagCellRenderer = TableCellRenderer<TableTagCellDataset>;

const TagRenderer: TableTagCellRenderer = function (props) {
  return (
    <RendererWrapper {...props}>
      {props.value && <Tag color={props.value.color} text={props.value.text} icon={props.value.icon} />}
    </RendererWrapper>
  );
};

export default React.memo(TagRenderer);
