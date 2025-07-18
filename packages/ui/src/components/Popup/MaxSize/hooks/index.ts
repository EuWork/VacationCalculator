import React from "react";

import { PopupCalculator } from "./calculator";

export function useUpdate(minHeight: number) {
  const [ref, setRef] = React.useState<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (!ref) return;
    const calculator = new PopupCalculator(ref, minHeight);
    return calculator.run();
  }, [minHeight, ref]);

  return setRef;
}
