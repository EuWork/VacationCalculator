import React from "react";
import { RightOutlined } from "@ant-design/icons";
import { Button } from "antd";

import { TableCellRenderer } from "../../renderer-types";

import { wrapperStyles } from "./style.css";

const arrowRenderer: TableCellRenderer<any> = function () {
  return (
    <div className={wrapperStyles}>
      <Button icon={<RightOutlined />} size="small" />
    </div>
  );
};

arrowRenderer.defaultWidth = 56;

export default arrowRenderer;
