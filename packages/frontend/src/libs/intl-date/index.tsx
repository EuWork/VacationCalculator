import React from "react";
import { IntlDate } from "@worksolutions/utils";
import { europeDateFormats } from "@app/ui";

function createIntlDate(language: string) {
  return new IntlDate({ languageCode: language, matchDateModeAndLuxonTypeLiteral: europeDateFormats });
}

const Context = React.createContext<IntlDate>(null!);

export function IntlDateProvider({ language, children }: React.PropsWithChildren<{ language: string }>) {
  const intlDateRu = React.useMemo(() => createIntlDate(language), [language]);
  return <Context.Provider value={intlDateRu}>{children}</Context.Provider>;
}

export function useIntlDate() {
  return React.useContext(Context);
}
