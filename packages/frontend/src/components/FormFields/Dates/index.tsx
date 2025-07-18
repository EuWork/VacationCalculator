import React from "react";
import { observer } from "mobx-react-lite";
import cn from "classnames";

import { MultipleDatePicker, MultipleDateValue, SingleDatePicker, SingleDateValue } from "components/DateTime";

import ModeSwitcher from "./ModeSwitcher";

import { wrapperStyles } from "./style.css";

export type FormFieldDatesValueSingle = { isInterval: false; value: SingleDateValue };
export type FormFieldDatesValueMulti = { isInterval: true; value: MultipleDateValue };
export type FormFieldDatesValue = FormFieldDatesValueSingle | FormFieldDatesValueMulti;

export interface FormFieldDatesInterface {
  className?: string;
  intervalText?: string;
  singleDatePlaceholder?: string;
  multiDatePlaceholderFrom?: string;
  multiDatePlaceholderTo?: string;
  minDate?: Date;
  maxDate?: Date;
  value: FormFieldDatesValue;
  setValue: (state: FormFieldDatesValue) => void;
}

function FormFieldDates({
  className,
  value,
  intervalText,
  singleDatePlaceholder,
  multiDatePlaceholderFrom,
  multiDatePlaceholderTo,
  minDate,
  maxDate,
  setValue,
}: FormFieldDatesInterface) {
  const handleModeChange = React.useCallback(
    (isInterval: boolean) => setValue({ isInterval, value: null }),
    [setValue],
  );

  const handleChangeSingleDate = React.useCallback(
    (value: SingleDateValue) => setValue({ isInterval: false, value }),
    [setValue],
  );

  const handleChangeMultiDate = React.useCallback(
    (value: MultipleDateValue) => setValue({ isInterval: true, value }),
    [setValue],
  );

  return (
    <div className={cn(className, wrapperStyles)}>
      {value.isInterval ? (
        <MultipleDatePicker
          value={value.value}
          placeholderFrom={multiDatePlaceholderFrom}
          placeholderTo={multiDatePlaceholderTo}
          minDate={minDate}
          maxDate={maxDate}
          onChange={handleChangeMultiDate}
        />
      ) : (
        <SingleDatePicker
          value={value.value}
          placeholder={singleDatePlaceholder}
          minDate={minDate}
          maxDate={maxDate}
          onChange={handleChangeSingleDate}
        />
      )}
      <ModeSwitcher text={intervalText} isInterval={value.isInterval} onChange={handleModeChange} />
    </div>
  );
}

export default observer(FormFieldDates);
