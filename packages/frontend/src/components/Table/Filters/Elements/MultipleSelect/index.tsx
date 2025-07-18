import React from "react";
import { observer } from "mobx-react-lite";
import { BaseEntity } from "@app/kit";
import { computed, observable } from "mobx";
import { isFunction } from "@worksolutions/utils";

import FormFieldMultipleSelect, {
  type FormFieldMultipleSelectItem,
  type FormFieldMultipleSelectValue,
} from "components/FormFields/MultipleSelect";

import TableFiltersTemplate from "../../Template";

import { wrapperStyles } from "./style.css";

interface TableFilterMultipleSelectInterface {
  __rand: number;
  value: TableFilterMultipleSelectValue;
  submitText?: string;
  resetText?: string;
  placeholder: string;
  items: FormFieldMultipleSelectItem[] | (() => FormFieldMultipleSelectItem[]);
  onClose: () => void;
}

function TableFilterMultipleSelectComponent({
  __rand,
  value: { value, setValue },
  placeholder,
  items,
  onClose,
  ...props
}: TableFilterMultipleSelectInterface) {
  const [tempValue, setTempValue] = React.useState(value);
  React.useEffect(() => setTempValue(value), [__rand, value]);

  const handleChange = React.useCallback((newValue: FormFieldMultipleSelectValue) => setValue(newValue), [setValue]);

  const handleReset = React.useCallback(() => {
    handleChange([]);
    onClose();
  }, [handleChange, onClose]);

  const handleSubmitAndClose = React.useCallback(() => {
    handleChange(tempValue);
    onClose();
  }, [handleChange, onClose, tempValue]);

  const resultItems = React.useMemo(() => (isFunction(items) ? items() : items), [items]);

  return (
    <TableFiltersTemplate onSubmit={handleSubmitAndClose} onReset={handleReset} {...props}>
      <FormFieldMultipleSelect
        className={wrapperStyles}
        placeholder={placeholder}
        placement="topLeft"
        items={resultItems}
        value={tempValue}
        setValue={setTempValue}
      />
    </TableFiltersTemplate>
  );
}

export const TableFilterMultipleSelect = observer(TableFilterMultipleSelectComponent);

export class TableFilterMultipleSelectValue extends BaseEntity {
  static build() {
    return new TableFilterMultipleSelectValue();
  }

  constructor() {
    super();
    this.mobx();
  }

  @observable value: FormFieldMultipleSelectValue = [];
  setValue = this.createSetter<FormFieldMultipleSelectValue>("value");

  @computed get valueSet() {
    return new Set(this.value);
  }

  @computed get _filtered() {
    return this.value.length !== 0;
  }

  @computed get apiReady() {
    return [...this.value];
  }

  subscribeOnChanges(callback: () => void) {
    return this.onFieldChange(callback, "value", 0);
  }

  @computed get serialize() {
    return this.value.join(",");
  }
}
