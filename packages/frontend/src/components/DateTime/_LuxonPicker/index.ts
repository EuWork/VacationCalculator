import React from "react";
import antLocaleRu from "antd/locale/ru_RU";
import generateLuxonConfig from "rc-picker/lib/generate/luxon";
import { DatePicker } from "antd";
import { DateMode, IntlDate } from "@worksolutions/utils";
import { DateTime } from "luxon";

import { getLanguage } from "../_libs/config";
import { europeDateFormats } from "./dateFormats";

export const LuxonDatePicker = DatePicker.generatePicker(generateLuxonConfig);

type UseDatePickerOptions = {
  format: DateMode | undefined;
};

export function useDateTimePicker({ format = DateMode.DATE }: UseDatePickerOptions) {
  const intlDate = React.useMemo(
    () => new IntlDate({ languageCode: getLanguage(), matchDateModeAndLuxonTypeLiteral: europeDateFormats }),
    [],
  );

  const locale = React.useMemo(
    () => (intlDate.config.languageCode === "ru" ? antLocaleRu : undefined),
    [intlDate.config.languageCode],
  );

  const pickerFormat = React.useCallback((value: DateTime) => intlDate.formatDate(value, format)!, [format, intlDate]);

  return { intlDate, locale, pickerFormat };
}
