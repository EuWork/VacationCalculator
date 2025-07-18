//TODO: добавить нормальную интернационализацию
import { isString, path, template } from "@worksolutions/utils";

import type { TranslationsNumerableObject, TranslationsRecursiveObject } from "../index";

export function fakeTranslate(
  key: string,
  translations: TranslationsRecursiveObject,
  options?: Record<string, string | number>,
) {
  const translateResult = path<string>(key.split("."), translations) as string | TranslationsNumerableObject;

  if (isString(translateResult)) {
    if (options) return template(translateResult, options);
    return translateResult;
  }

  if (!options) return "—";
  return getNumerableString(translateResult, options);
}

function getNumerableString(translate: TranslationsNumerableObject, options: Record<string, string | number>) {
  if (!("count" in options)) return "—";
  return template(
    ruPluralize(parseInt(options.count.toString()), [translate.one, translate.few, translate.more]),
    options,
  );
}

function ruPluralize(count: number, words: [string, string, string]) {
  const cases = [2, 0, 1, 1, 1, 2];
  return words[count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]];
}
