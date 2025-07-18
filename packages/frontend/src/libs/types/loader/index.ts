import type { ParseServerErrorResult } from "libs/parse-server-error";

export type DefaultLoaderMethodResponseError<ERROR = ParseServerErrorResult> = { success: false; error: ERROR };

export type DefaultLoaderMethodResponse<DATA = unknown, ERROR = ParseServerErrorResult> = Promise<
  { success: true; data: DATA } | DefaultLoaderMethodResponseError<ERROR>
>;
