import React from "react";
import { observer } from "mobx-react-lite";
import { isFunction } from "@worksolutions/utils";

import FormFieldCheckboxesTree, {
  type FormFieldCheckboxesTreeItem,
  type FormFieldCheckboxesTreeValue,
} from "components/FormFields/CheckboxesTree";

import TableFilterTemplate from "../../Template";
import { TableFilterCheckboxesValue } from "../Checkboxes";

import { checkboxesTreeStyles, scrollStyles, searchStyles } from "./style.css";

interface TableFilterCheckboxesTreeInterface {
  __rand: number;
  value: TableFilterCheckboxesTreeValue;
  submitText?: string;
  resetText?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  items: FormFieldCheckboxesTreeItem[] | (() => FormFieldCheckboxesTreeItem[]);
  onClose: () => void;
}

function TableFilterCheckboxesTreeComponent({
  __rand,
  value: { value, setValue },
  items,
  searchable,
  searchPlaceholder,
  onClose,
  ...props
}: TableFilterCheckboxesTreeInterface) {
  const [tempValue, setTempValue] = React.useState(value);
  React.useEffect(() => setTempValue(value), [__rand, value]);

  const handleChange = React.useCallback((newValue: FormFieldCheckboxesTreeValue) => setValue(newValue), [setValue]);

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
      <FormFieldCheckboxesTree
        className={checkboxesTreeStyles}
        searchClassName={searchStyles}
        scrollClassName={scrollStyles}
        scroll
        items={resultItems}
        value={tempValue}
        searchable={searchable}
        searchPlaceholder={searchPlaceholder}
        search={search}
        setSearch={setSearch}
        setValue={setTempValue}
      />
    </TableFilterTemplate>
  );
}

export const TableFilterCheckboxesTree = observer(TableFilterCheckboxesTreeComponent);

export class TableFilterCheckboxesTreeValue extends TableFilterCheckboxesValue {
  static build() {
    return new TableFilterCheckboxesTreeValue();
  }
}
