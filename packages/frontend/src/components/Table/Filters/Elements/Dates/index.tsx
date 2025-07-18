import React from "react";
import { observer } from "mobx-react-lite";
import { BaseEntity } from "@app/kit";
import { action, computed, observable } from "mobx";
import { DateTime } from "luxon";

import FormFieldDates, { type FormFieldDatesValue } from "components/FormFields/Dates";
import type { MultipleDateValue, SingleDateValue } from "components/DateTime";

import TableFiltersTemplate from "../../Template";
import { setDateEndDay, setDateStartDay } from "../../../../../libs";

import { wrapperStyles } from "./style.css";

interface TableFilterDatesInterface {
  __rand: number;
  value: TableFilterDatesValue;
  submitText?: string;
  resetText?: string;
  intervalText?: string;
  singleDatePlaceholder?: string;
  multiDatePlaceholderFrom?: string;
  multiDatePlaceholderTo?: string;
  onClose: () => void;
}

function TableFilterDatesComponent({
  __rand,
  value: { value, setValue, minDate, maxDate },
  intervalText,
  singleDatePlaceholder,
  multiDatePlaceholderFrom,
  multiDatePlaceholderTo,
  onClose,
  ...props
}: TableFilterDatesInterface) {
  const [tempValue, setTempValue] = React.useState<FormFieldDatesValue | undefined>(value);
  React.useEffect(() => setTempValue(value), [__rand, value]);

  const handleChange = React.useCallback(
    (newValue: FormFieldDatesValue | undefined) => {
      if (!newValue?.value) return setValue(undefined);
      setValue(newValue as TableFilterDatesValueResult);
    },
    [setValue],
  );

  const handleReset = React.useCallback(() => {
    handleChange(initialValue);
    onClose();
  }, [handleChange, onClose]);

  const handleSubmitAndClose = React.useCallback(() => {
    handleChange(tempValue);
    onClose();
  }, [handleChange, onClose, tempValue]);

  return (
    <TableFiltersTemplate onSubmit={handleSubmitAndClose} onReset={handleReset} {...props}>
      <FormFieldDates
        className={wrapperStyles}
        intervalText={intervalText}
        singleDatePlaceholder={singleDatePlaceholder}
        multiDatePlaceholderFrom={multiDatePlaceholderFrom}
        multiDatePlaceholderTo={multiDatePlaceholderTo}
        minDate={minDate}
        maxDate={maxDate}
        value={tempValue ?? initialValue}
        setValue={setTempValue}
      />
    </TableFiltersTemplate>
  );
}

const initialValue: FormFieldDatesValue = { isInterval: false, value: null };

export const TableFilterDates = observer(TableFilterDatesComponent);

export type TableFilterDatesValueResult =
  | undefined
  | { isInterval: false; value: Exclude<SingleDateValue, null> }
  | { isInterval: true; value: Exclude<MultipleDateValue, null> };

type Options = { maxDate?: "current"; minDate?: "current" };

export class TableFilterDatesValue extends BaseEntity {
  static build(options?: Options) {
    return new TableFilterDatesValue(options);
  }

  constructor(private options?: Options) {
    super();
    this.mobx();
  }

  @observable value: TableFilterDatesValueResult | undefined = undefined;
  @observable nativeInputValue: FormFieldDatesValue | undefined = undefined;
  @computed get nativeInputValueOrInitial() {
    return this.nativeInputValue ?? initialValue;
  }

  @computed get minDate() {
    const minDate = this.options?.minDate;
    return minDate === "current" ? setDateStartDay(DateTime.now()).toJSDate() : undefined;
  }

  @computed get maxDate() {
    const maxDate = this.options?.maxDate ?? "current";
    return maxDate === "current" ? setDateEndDay(DateTime.now()).toJSDate() : undefined;
  }

  @action setValue = (value: TableFilterDatesValueResult | undefined) => {
    this.value = value;
    this.nativeInputValue = value;
  };

  @action setNativeInputValue = (value: FormFieldDatesValue | undefined) => {
    this.nativeInputValue = value;
    if (!value || !value.value) return void (this.value = undefined);
    this.value = value as TableFilterDatesValueResult;
  };

  @computed get _filtered() {
    const value = this.value;
    if (!value) return false;

    if (value.isInterval) {
      if (value.value) return value.value.some((date) => date !== null);
      return false;
    }

    return value.value !== null;
  }

  @computed get apiReady() {
    if (!this.value) return undefined;
    if (this.value.isInterval) return this.value.value;
    return this.value.value ?? undefined;
  }

  subscribeOnChanges(callback: () => void) {
    return this.onMultipleFieldChange(callback, ["value", "nativeInputValue"], 1);
  }

  @computed get serialize() {
    if (!this.value) return "";
    return JSON.stringify(this.value);
  }
}
