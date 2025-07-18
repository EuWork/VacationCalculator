import React from "react";
import { Spin } from "antd";

import { spinStyles } from "./style.css";

function FullSizeLoader() {
  return <Spin className={spinStyles} size="large" />;
}

export default React.memo(FullSizeLoader);
