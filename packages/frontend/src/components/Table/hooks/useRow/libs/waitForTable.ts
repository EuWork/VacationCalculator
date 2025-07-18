import React from "react";
import type { Reference } from "rc-table/lib/interface";
import { waitFor } from "@worksolutions/utils";

export function waitForTable(
  ref: React.MutableRefObject<Reference | null>,
  timeoutMS: number,
  callback: (table: Reference) => void,
) {
  const ac = new AbortController();
  const promiseWaitFor = waitFor(() => !!ref.current, { timeoutMS, checkIntervalMS: 200, abortSignal: ac.signal });

  promiseWaitFor.then(
    () => callback(ref.current!),
    () => null,
  );

  return () => ac.abort();
}
