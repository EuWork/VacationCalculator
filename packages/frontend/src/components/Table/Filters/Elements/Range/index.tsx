import React from "react";
import { observer } from "mobx-react-lite";
import { BaseEntity } from "@app/kit";
import { computed, observable } from "mobx";
import { isNil } from "@worksolutions/utils";

import FormFieldRange, { type FormFieldRangeValue } from "components/FormFields/Range";

import TableFilterTemplate from "../../Template";

interface TableFilterRangeInterface {
  __rand: number;
  value: TableFilterRangeValue;
  submitText?: string;
  resetText?: string;
  onClose: () => void;
}

function TableFilterRangeComponent({
  __rand,
  value: { value, setValue },
  onClose,
  ...props
}: TableFilterRangeInterface) {
  const [tempValue, setTempValue] = React.useState(value);
  React.useEffect(() => setTempValue(value), [__rand, value]);

  const handleChange = React.useCallback((newValue: FormFieldRangeValue) => setValue(newValue), [setValue]);

  const handleReset = React.useCallback(() => {
    handleChange({ minValue: null, maxValue: null });
    onClose();
  }, [handleChange, onClose]);

  const handleSubmitAndClose = React.useCallback(() => {
    handleChange(tempValue);
    onClose();
  }, [handleChange, onClose, tempValue]);

  return (
    <TableFilterTemplate onSubmit={handleSubmitAndClose} onReset={handleReset} {...props}>
      <FormFieldRange value={tempValue} setValue={setTempValue} />
    </TableFilterTemplate>
  );
}

export const TableFilterRange = observer(TableFilterRangeComponent);

export class TableFilterRangeValue extends BaseEntity {
  static build() {
    return new TableFilterRangeValue();
  }

  constructor() {
    super();
    this.mobx();
  }

  @observable value: FormFieldRangeValue = { minValue: null, maxValue: null };
  setValue = this.createSetter<FormFieldRangeValue>("value");

  @computed get _filtered() {
    return !isNil(this.value.minValue) || !isNil(this.value.maxValue);
  }

  @computed get apiReady() {
    return { ...this.value };
  }

  subscribeOnChanges(callback: () => void) {
    return this.onFieldChange(callback, "value", 0);
  }

  @computed get serialize() {
    return JSON.stringify(this.value);
  }
}
