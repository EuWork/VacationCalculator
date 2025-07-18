import React from "react";

import { divStyles } from "./style.css";

function BackgroundColorFill() {
  const [ref, setRef] = React.useState<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (!ref) return;
    document.body.style.backgroundColor = getComputedStyle(ref).color;
  }, [ref]);

  return <div ref={setRef} className={divStyles} />;
}

export default React.memo(BackgroundColorFill);
