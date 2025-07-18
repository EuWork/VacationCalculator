import React from "react";

import { useTranslation } from "libs";

import NoData from "components/NoData";

function DefaultErrorCard() {
  const t = useTranslation();
  return (
    <NoData
      title={t("common.component_not_loaded_error.title")}
      description={t("common.component_not_loaded_error.description")}
    />
  );
}

export default React.memo(DefaultErrorCard);
