import React from "react";
import { Select } from "antd";
import cn from "classnames";
import type { SelectCommonPlacement } from "antd/es/_util/motion";
import { BaseOptionType } from "rc-select/lib/Select";
import { observer } from "mobx-react-lite";

import { selectItemStyles, wrapperStyles } from "./style.css";

export interface FormFieldMultipleSelectItem {
  className?: string;
  label: React.ReactNode;
  value: string;
}

export type FormFieldMultipleSelectValue = string[];

export type FormFieldMultipleSelectPlacement = SelectCommonPlacement;

export interface FormFieldMultipleSelectInterface {
  className?: string;
  placeholder: string;
  items: FormFieldMultipleSelectItem[];
  value: FormFieldMultipleSelectValue;
  placement?: FormFieldMultipleSelectPlacement;
  setValue: (state: FormFieldMultipleSelectValue) => void;
}

function FormFieldMultipleSelect({
  className,
  placeholder,
  placement,
  items,
  value,
  setValue,
}: FormFieldMultipleSelectInterface) {
  const selectOptions = React.useMemo<BaseOptionType[]>(
    () => items.map((item) => ({ ...item, className: cn(item.className, selectItemStyles) })),
    [items],
  );

  const handleSelectChange = React.useCallback((value: string[]) => setValue(value), [setValue]);

  return (
    <div className={cn(className, wrapperStyles)}>
      <Select
        mode="multiple"
        value={value}
        allowClear
        placeholder={placeholder}
        popupMatchSelectWidth={false}
        placement={placement}
        options={selectOptions}
        onChange={handleSelectChange}
      />
    </div>
  );
}

export default observer(FormFieldMultipleSelect);
