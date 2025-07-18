import React from "react";
import { observer } from "mobx-react-lite";
import { DateTime } from "luxon";
import { ConfigProvider } from "antd";
import { DateMode } from "@worksolutions/utils";
import cn from "classnames";

import { useTranslation } from "libs";

import Typography from "components/Typography";

import { LuxonDatePicker, useDateTimePicker } from "../../_LuxonPicker";
import { convertLuxonToJs } from "../../_libs/convertLuxonToJs";

import { errorTextStyles, inputErrorStyles, wrapperStyles } from "./style.css";

export type MultipleDateValue = null | [Date, null] | [null, Date] | [Date, Date];

interface MultipleDatePickerInterface {
  className?: string;
  value: MultipleDateValue;
  placeholderFrom?: string | undefined;
  placeholderTo?: string | undefined;
  minDate?: Date;
  maxDate?: Date;
  errorMessage?: string;
  onChange: (value: MultipleDateValue) => void;
}

function MultipleDatePicker({
  className,
  value,
  placeholderFrom,
  placeholderTo,
  minDate,
  maxDate,
  errorMessage,
  onChange,
}: MultipleDatePickerInterface) {
  const t = useTranslation();

  const { intlDate, pickerFormat, locale } = useDateTimePicker({ format: DateMode.DATE });

  const placeholder = React.useMemo(
    () =>
      [
        placeholderFrom ?? t("common.date_picker.multiple.from.placeholder"),
        placeholderTo ?? t("common.date_picker.multiple.to.placeholder"),
      ] as [string, string],
    [placeholderFrom, placeholderTo, t],
  );

  const resultValue = React.useMemo<AntRangeValue>(() => {
    if (!value) return null;
    const [from, to] = value;
    const fromValue = from ? DateTime.fromJSDate(from).setLocale(intlDate.config.languageCode) : null;
    const toValue = to ? DateTime.fromJSDate(to).setLocale(intlDate.config.languageCode) : null;
    return [fromValue, toValue];
  }, [intlDate.config.languageCode, value]);

  const handleChange = React.useCallback(
    (value: AntRangeValue) => {
      if (!value) return onChange(null);
      const [from, to] = value;
      const fromValue = from ? convertLuxonToJs(from) : null;
      const toValue = to ? convertLuxonToJs(to) : null;
      onChange([fromValue, toValue] as MultipleDateValue);
    },
    [onChange],
  );

  const resultMinDate = React.useMemo(() => (minDate ? DateTime.fromJSDate(minDate) : undefined), [minDate]);
  const resultMaxDate = React.useMemo(() => (maxDate ? DateTime.fromJSDate(maxDate) : undefined), [maxDate]);

  return (
    <ConfigProvider locale={locale}>
      <div className={cn(className, wrapperStyles)}>
        <LuxonDatePicker.RangePicker
          className={cn(errorMessage && inputErrorStyles)}
          allowEmpty={allowEmpty}
          placeholder={placeholder}
          value={resultValue}
          format={pickerFormat}
          minDate={resultMinDate}
          maxDate={resultMaxDate}
          onChange={handleChange}
        />
        {errorMessage && (
          <Typography className={errorTextStyles} type="span">
            {errorMessage}
          </Typography>
        )}
      </div>
    </ConfigProvider>
  );
}

export default observer(MultipleDatePicker);

const allowEmpty = [true, true] as [boolean, boolean];

type AntEventValue<DateType> = DateType | null;
type AntRangeValue = [AntEventValue<DateTime>, AntEventValue<DateTime>] | null;
