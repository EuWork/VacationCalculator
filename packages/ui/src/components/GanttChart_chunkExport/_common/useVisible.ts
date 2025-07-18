import React from "react";

import { ScrollProviderContext } from "components/ScrollProvider";

export function useVisible(defaultVisible: boolean) {
  const [visible, setVisible] = React.useState(defaultVisible);
  const [element, setElement] = React.useState<HTMLElement | null>(null);
  const { scrollableElement } = React.useContext(ScrollProviderContext);

  React.useEffect(() => {
    if (!element || scrollableElement === window) return;
    setVisible(true);
  }, [element, scrollableElement]);

  return [visible, setElement] as const;
}
