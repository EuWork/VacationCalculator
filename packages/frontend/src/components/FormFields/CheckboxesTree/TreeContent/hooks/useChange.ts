import React from "react";
import { without } from "@worksolutions/utils";
import { useSyncToRef } from "@worksolutions/react-utils";

import type { FormFieldCheckboxesTreeValue } from "../../index";

type Options = { checked: boolean; node: { key: React.Key } };

export function useChange(
  value: FormFieldCheckboxesTreeValue,
  onChange: (state: FormFieldCheckboxesTreeValue) => void,
) {
  const valueRef = useSyncToRef(value);
  return React.useCallback(
    (_: any, options: Options) => {
      const id = options.node.key as string;
      if (options.checked) {
        onChange([...valueRef.current, id]);
      } else {
        onChange(without([id], valueRef.current));
      }
    },
    [onChange, valueRef],
  );
}
