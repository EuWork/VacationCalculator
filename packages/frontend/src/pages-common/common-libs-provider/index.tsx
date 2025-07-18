import React from "react";

import { IntlDateProvider, TranslationProvider, useIntlDate } from "libs";

import { TableContextProvider } from "components/Table";
import * as translations from "translations";

interface CommonLibsProviderInterface {
  children: React.ReactNode;
}

function CommonLibsProvider({ children }: CommonLibsProviderInterface) {
  return (
    <IntlDateProvider language="ru">
      <TableProvider>
        <TranslationProvider translations={translations}>{children}</TranslationProvider>
      </TableProvider>
    </IntlDateProvider>
  );
}

export default React.memo(CommonLibsProvider);

function TableProvider({ children }: React.PropsWithChildren) {
  const intlDate = useIntlDate();
  return <TableContextProvider intlDate={intlDate}>{children}</TableContextProvider>;
}
