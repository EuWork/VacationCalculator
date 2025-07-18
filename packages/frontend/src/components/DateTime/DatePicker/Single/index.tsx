import React from "react";
import { observer } from "mobx-react-lite";
import { DateMode } from "@worksolutions/utils";
import { DateTime } from "luxon";
import { ConfigProvider } from "antd";

import { useTranslation } from "libs";

import { LuxonDatePicker, useDateTimePicker } from "../../_LuxonPicker";
import { convertLuxonToJs } from "../../_libs/convertLuxonToJs";

export type SingleDateValue = Date | null;

interface SingleDatePickerInterface {
  value: SingleDateValue;
  placeholder: string | undefined;
  minDate?: Date;
  maxDate?: Date;
  onChange: (value: SingleDateValue) => void;
}

function SingleDatePicker({ value, placeholder, minDate, maxDate, onChange }: SingleDatePickerInterface) {
  const t = useTranslation();

  const { intlDate, pickerFormat, locale } = useDateTimePicker({ format: DateMode.DATE });

  const resultPlaceholder = placeholder ?? t("common.date_picker.single.placeholder");

  const resultValue = React.useMemo(() => {
    if (!value) return null;
    return DateTime.fromJSDate(value).setLocale(intlDate.config.languageCode);
  }, [intlDate.config.languageCode, value]);

  const handleChange = React.useCallback(
    (value: DateTime | null) => onChange(value === null ? null : convertLuxonToJs(value)),
    [onChange],
  );

  const resultMinDate = React.useMemo(() => (minDate ? DateTime.fromJSDate(minDate) : undefined), [minDate]);
  const resultMaxDate = React.useMemo(() => (maxDate ? DateTime.fromJSDate(maxDate) : undefined), [maxDate]);

  return (
    <ConfigProvider locale={locale}>
      <LuxonDatePicker
        placeholder={resultPlaceholder}
        value={resultValue}
        format={pickerFormat}
        minDate={resultMinDate}
        maxDate={resultMaxDate}
        onChange={handleChange}
      />
    </ConfigProvider>
  );
}

export default observer(SingleDatePicker);
