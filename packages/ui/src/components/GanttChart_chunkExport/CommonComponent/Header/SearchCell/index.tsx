import React from "react";
import { Input } from "antd";

import { wrapperStyles } from "./style.css";

export interface GanttHeaderSearchCellInterface {
  value: string;
  placeholder: string;
  children?: React.ReactNode;
  onChange: (value: string) => void;
}

function GanttHeaderSearchCell({ value, placeholder, children, onChange }: GanttHeaderSearchCellInterface) {
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
    [onChange],
  );

  return (
    <div className={wrapperStyles} data-gantt-disable-drag>
      <Input.Search value={value} size="small" placeholder={placeholder} onChange={handleChange} />
      {children}
    </div>
  );
}

export default React.memo(GanttHeaderSearchCell);
