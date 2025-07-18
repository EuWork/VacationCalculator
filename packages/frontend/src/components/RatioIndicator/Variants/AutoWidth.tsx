import { useMeasure } from "@worksolutions/react-utils";
import React from "react";

import RatioIndicatorContent from "../Content";
import type { BarsViewInterface, BlocksViewInterface } from "../types";

type RatioIndicatorAutoWidthInterface = {
  className?: string;
} & (BarsViewInterface | BlocksViewInterface);

function RatioIndicatorAutoWidth(props: RatioIndicatorAutoWidthInterface) {
  const [ref, size] = useMeasure();
  return <RatioIndicatorContent ref={ref} width={size.width} {...props} />;
}

export default React.memo(RatioIndicatorAutoWidth);
