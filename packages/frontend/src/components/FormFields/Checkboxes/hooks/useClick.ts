import { useMemoizeCallback, useSyncToRef } from "@worksolutions/react-utils";
import { identity, without } from "@worksolutions/utils";

import { FormFieldCheckboxesValue } from "../index";

export function useClick(value: FormFieldCheckboxesValue, setValue: (state: FormFieldCheckboxesValue) => void) {
  const currentValueRef = useSyncToRef(value);
  return useMemoizeCallback(
    (value: string) => () => {
      if (currentValueRef.current.includes(value)) return setValue(without([value], currentValueRef.current));
      return setValue([...currentValueRef.current, value]);
    },
    [currentValueRef, setValue],
    identity,
  );
}
