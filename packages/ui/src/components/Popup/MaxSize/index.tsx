import React from "react";
import cn from "classnames";

import { useUpdate } from "./hooks";

import { hiddenStyles, overlayStyles } from "./style.css";

interface PopoverMaxSizeInterface {
  minHeight?: number;
  children: React.JSX.Element;
}

function PopoverMaxSize({ minHeight = 0, children }: PopoverMaxSizeInterface) {
  const setRef = useUpdate(minHeight);

  return React.cloneElement(children, {
    overlayClassName: cn(overlayStyles, children.props.overlayClassName),
    destroyTooltipOnHide: true,
    content: (
      <div ref={setRef} className={hiddenStyles}>
        {children.props.content}
      </div>
    ),
  });
}

export default React.memo(PopoverMaxSize);
