import type { RouterQuery } from "./index";

export function createNewUrl(url: string, params: RouterQuery | undefined) {
  if (!params) return url;

  const paramsMap = new Map<string, string>();
  Object.entries(params).forEach(([key, value]) => value !== undefined && paramsMap.set(key, value));

  let resultUrl = url;

  paramsMap.forEach((value, key) => {
    const resultKey = `:${key}`;
    if (!resultUrl.includes(resultKey)) return;
    resultUrl = resultUrl.replace(resultKey, value);
    paramsMap.delete(key);
  });

  if (paramsMap.size === 0) return resultUrl;

  const searchParams = new URLSearchParams();
  paramsMap.forEach((value, key) => searchParams.append(key, value));
  return `${resultUrl}?${searchParams.toString()}`;
}
