import React from "react";

import RatioIndicatorContent from "../Content";
import type { BarsViewInterface, BlocksViewInterface } from "../types";

type RatioIndicatorCertainWidthInterface = {
  className?: string;
  width: number;
} & (BarsViewInterface | BlocksViewInterface);

function RatioIndicatorCertainWidth(props: RatioIndicatorCertainWidthInterface) {
  return <RatioIndicatorContent {...props} />;
}

export default React.memo(RatioIndicatorCertainWidth);
