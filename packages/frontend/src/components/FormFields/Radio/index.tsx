import React from "react";
import { Radio } from "antd";
import { useMemoizeCallback, useSyncToRef } from "@worksolutions/react-utils";
import { identity } from "@worksolutions/utils";
import cn from "classnames";
import { observer } from "mobx-react-lite";

import { FormFieldCheckboxesItem } from "../Checkboxes";

import { wrapperStyles } from "./style.css";

export type FormFieldRadioValue = string | null;

export interface FormFieldRadioInterface {
  className?: string;
  items: FormFieldCheckboxesItem[];
  value: FormFieldRadioValue;
  setValue: (state: Exclude<FormFieldRadioValue, null>) => void;
}

function FormFieldRadio({ className, items, value, setValue }: FormFieldRadioInterface) {
  const currentValueRef = useSyncToRef(value);
  const handleClickFabric = useMemoizeCallback(
    (value: string) => () => {
      if (currentValueRef.current === value) return;
      return setValue(value);
    },
    [currentValueRef, setValue],
    identity,
  );

  return (
    <div className={cn(className, wrapperStyles)}>
      {items.map((item) => (
        <Radio key={item.value} checked={value === item.value} onClick={handleClickFabric(item.value)}>
          {item.label}
        </Radio>
      ))}
    </div>
  );
}

export default observer(FormFieldRadio);
