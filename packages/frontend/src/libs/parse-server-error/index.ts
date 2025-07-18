import { isPureObject, isString } from "@worksolutions/utils";
import { AppRequestError } from "@app/kit";

type ResultErrorsType = Record<string, string[]>;

function parseServerErrorCodeAndMessages(errors: ResultErrorsType, keysMatcher: Record<string, string> = {}) {
  const results: { field: string; message: string }[] = [];
  Object.entries(errors).forEach(([key, error]) => {
    const updatedKey = key[0].toLowerCase() + key.slice(1);
    results.push({ field: keysMatcher[updatedKey] ?? updatedKey, message: error[0] });
  });
  return results;
}

export function parseServerError(rawError: any, keysMatcher: Record<string, string> = {}) {
  if (!AppRequestError.isRequestError(rawError)) return false;
  const response = rawError.data.response?.data;
  if (!response) return false;
  if (!isPureObject(response)) return false;
  if (isPureObject(response.errors)) return parseServerErrorCodeAndMessages(response.errors, keysMatcher);
  if (isString(response.title)) return response.title;
  return false;
}

export type ParseServerErrorResult = ReturnType<typeof parseServerError>;

export function parseServerDefaultError<
  T extends Partial<Record<404 | 422 | "common" | "badData", ((e: AppRequestError) => unknown) | undefined>>,
>(e: unknown, handlers: T): ReturnType<Extract<T[keyof T], () => unknown>> {
  if (!AppRequestError.isRequestError(e)) throw e;
  const is404 = e.data.statusCode === 404;
  const is422 = e.data.statusCode === 422;
  if (is404 && handlers["404"]) return handlers["404"](e) as any;
  if (is422 && handlers["422"]) return handlers["422"](e) as any;
  if ((is404 || is422) && handlers["badData"]) return handlers["badData"](e) as any;
  if (handlers["common"]) return handlers["common"](e) as any;
  throw new Error("not found handler");
}
