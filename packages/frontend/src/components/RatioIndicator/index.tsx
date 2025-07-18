import React from "react";

import type { BarsViewInterface, BlocksViewInterface } from "./types";
import RatioIndicatorAutoWidth from "./Variants/AutoWidth";
import RatioIndicatorCertainWidth from "./Variants/CertainWidth";

export type RatioIndicatorInterface = {
  className?: string;
  width?: number;
} & (BarsViewInterface | BlocksViewInterface);

function RatioIndicator({ width, ...props }: RatioIndicatorInterface) {
  if (width === undefined) return <RatioIndicatorAutoWidth {...props} />;
  return <RatioIndicatorCertainWidth width={width} {...props} />;
}

export default React.memo(RatioIndicator);

export type { BarValue, BlockValue } from "./types";
