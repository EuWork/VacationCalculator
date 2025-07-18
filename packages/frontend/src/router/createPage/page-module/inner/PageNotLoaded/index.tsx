import React from "react";
import { UiPage } from "@app/ui";

import { TranslationFunction } from "libs";

import NoData from "components/NoData";

import { contentStyles, pageStyles } from "./style.css";

interface PageNotLoadedInterface {
  t: TranslationFunction;
}

function PageNotLoaded({ t }: PageNotLoadedInterface) {
  return (
    <UiPage className={pageStyles} pageName={null}>
      <NoData
        className={contentStyles}
        title={t("common.page_not_loaded_error.title")}
        description={t("common.page_not_loaded_error.description")}
      />
    </UiPage>
  );
}

export default React.memo(PageNotLoaded);
