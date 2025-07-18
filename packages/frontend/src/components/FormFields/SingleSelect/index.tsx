import React from "react";
import { Select } from "antd";
import cn from "classnames";
import type { SelectCommonPlacement } from "antd/es/_util/motion";
import { BaseOptionType } from "rc-select/lib/Select";
import { observer } from "mobx-react-lite";

import { nullValueSelectStyles, selectItemStyles, wrapperStyles } from "./style.css";

export interface FormFieldSingleSelectItem {
  className?: string;
  label: React.ReactNode;
  value: string | null;
}

export type FormFieldSingleSelectValue = string | null;

export type FormFieldSingleSelectPlacement = SelectCommonPlacement;

export interface FormFieldSingleSelectInterface {
  className?: string;
  placeholder: string;
  allowClear?: boolean;
  items: FormFieldSingleSelectItem[];
  value: FormFieldSingleSelectValue;
  placement?: FormFieldSingleSelectPlacement;
  disabled?: boolean;
  setValue: (state: FormFieldSingleSelectValue) => void;
}

function FormFieldSingleSelect({
  className,
  placeholder,
  placement,
  allowClear = false,
  items,
  value,
  disabled,
  setValue,
  ...props
}: FormFieldSingleSelectInterface) {
  const selectOptions = React.useMemo<BaseOptionType[]>(
    () => items.map((item) => ({ ...item, className: cn(item.className, selectItemStyles) })),
    [items],
  );

  const handleSelectChange = React.useCallback((value: string | null) => setValue(value), [setValue]);

  return (
    <div className={cn(className, wrapperStyles, value === null && nullValueSelectStyles)} {...props}>
      <Select
        disabled={disabled}
        value={value}
        allowClear={allowClear}
        placeholder={placeholder}
        popupMatchSelectWidth={false}
        placement={placement}
        options={selectOptions}
        onChange={handleSelectChange}
      />
    </div>
  );
}

export default observer(FormFieldSingleSelect);
