import React from "react";
import { observer } from "mobx-react-lite";
import { BaseEntity } from "@app/kit";
import { computed, observable } from "mobx";
import { isFunction } from "@worksolutions/utils";

import FormFieldCheckboxes, {
  type FormFieldCheckboxesItem,
  type FormFieldCheckboxesValue,
} from "components/FormFields/Checkboxes";

import TableFilterTemplate from "../../Template";

import { checkboxesStyles, scrollContentStyles, scrollStyles, searchStyles } from "./style.css";

interface TableFilterCheckboxesInterface {
  __rand: number;
  value: TableFilterCheckboxesValue;
  submitText?: string;
  resetText?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  items: FormFieldCheckboxesItem[] | (() => FormFieldCheckboxesItem[]);
  onClose: () => void;
}

function TableFilterCheckboxesComponent({
  __rand,
  value: { value, setValue },
  items,
  searchable,
  searchPlaceholder,
  onClose,
  ...props
}: TableFilterCheckboxesInterface) {
  const [tempValue, setTempValue] = React.useState(value);
  React.useEffect(() => setTempValue(value), [__rand, value]);

  const handleChange = React.useCallback((newValue: FormFieldCheckboxesValue) => setValue(newValue), [setValue]);

  const handleReset = React.useCallback(() => {
    handleChange([]);
    onClose();
  }, [handleChange, onClose]);

  const handleSubmitAndClose = React.useCallback(() => {
    handleChange(tempValue);
    onClose();
  }, [handleChange, onClose, tempValue]);

  const resultItems = React.useMemo(() => (isFunction(items) ? items() : items), [items]);

  const [search, setSearch] = React.useState("");
  React.useEffect(() => setSearch(""), [__rand]);

  return (
    <TableFilterTemplate onSubmit={handleSubmitAndClose} onReset={handleReset} {...props}>
      <FormFieldCheckboxes
        className={checkboxesStyles}
        searchClassName={searchStyles}
        scrollClassName={scrollStyles}
        scrollContentClassName={scrollContentStyles}
        items={resultItems}
        value={tempValue}
        scroll
        searchable={searchable}
        searchPlaceholder={searchPlaceholder}
        search={search}
        setSearch={setSearch}
        setValue={setTempValue}
      />
    </TableFilterTemplate>
  );
}

export const TableFilterCheckboxes = observer(TableFilterCheckboxesComponent);

export class TableFilterCheckboxesValue extends BaseEntity {
  static build() {
    return new TableFilterCheckboxesValue();
  }

  constructor() {
    super();
    this.mobx();
  }

  @observable value: FormFieldCheckboxesValue = [];
  setValue = this.createSetter<FormFieldCheckboxesValue>("value");

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
