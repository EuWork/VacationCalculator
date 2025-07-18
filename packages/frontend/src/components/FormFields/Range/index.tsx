import React from "react";
import cn from "classnames";
import { observer } from "mobx-react-lite";
import { InputNumber } from "antd";

import { useTranslation } from "libs";

import Typography from "components/Typography";

import { wrapperStyles, inputWrapperStyles } from "./style.css";

export type FormFieldRangeValue = { minValue: number | null; maxValue: number | null };

export interface FormFieldRangeInterface {
  className?: string;
  value: FormFieldRangeValue;
  setValue: (value: FormFieldRangeValue) => void;
}

function FormFieldRange({ className, value, setValue }: FormFieldRangeInterface) {
  const t = useTranslation().withKeyPrefix("common.form_fields.range");

  const handleMinValueChange = React.useCallback(
    (minValue: number | null) => setValue({ ...value, minValue }),
    [value, setValue],
  );

  const handleMaxValueChange = React.useCallback(
    (maxValue: number | null) => setValue({ ...value, maxValue }),
    [value, setValue],
  );

  return (
    <div className={cn(className, wrapperStyles)}>
      <div className={inputWrapperStyles}>
        <Typography type="span-2">{t("label.from")}</Typography>
        <InputNumber
          size="small"
          value={value.minValue}
          placeholder={t("placeholder.from")}
          onChange={handleMinValueChange}
          min={0}
          step={0.01}
        />
      </div>

      <div className={inputWrapperStyles}>
        <Typography type="span-2">{t("label.to")}</Typography>
        <InputNumber
          size="small"
          value={value.maxValue}
          placeholder={t("placeholder.to")}
          onChange={handleMaxValueChange}
          min={0}
          step={0.01}
        />
      </div>
    </div>
  );
}

export default observer(FormFieldRange);
