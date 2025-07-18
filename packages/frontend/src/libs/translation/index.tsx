import React from "react";

import { fakeTranslate } from "./fakeIntl";

type Options = Record<string, string | number>;

export type PureTranslationFunction = (key: string, options?: Options) => string;

export type TranslationFunction = PureTranslationFunction & {
  withKeyPrefix: (prefix: string) => PureTranslationFunction & { original: PureTranslationFunction };
};

const Context = React.createContext<TranslationFunction>(null!);

export type TranslationsNumerableObject = { one: string; few: string; more: string };

export type TranslationsRecursiveObject = {
  [key: string]: string | TranslationsRecursiveObject | TranslationsNumerableObject;
};

interface TranslationProviderInterface {
  children: React.ReactNode;
  translations: TranslationsRecursiveObject;
}

export function TranslationProvider({ translations, children }: TranslationProviderInterface) {
  const translation = React.useMemo<TranslationFunction>(() => {
    const t = (key: string, options?: Options) => fakeTranslate(key, translations, options);
    t.withKeyPrefix = (prefix: string) => {
      const func = (key: string, options?: Options) => t(prefix + "." + key, options);
      func.original = t;
      return func;
    };
    return t;
  }, [translations]);

  return <Context.Provider value={translation}>{children}</Context.Provider>;
}

export function useTranslation() {
  return React.useContext(Context);
}
