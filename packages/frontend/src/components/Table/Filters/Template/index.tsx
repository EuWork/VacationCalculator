import React from "react";
import { Button } from "antd";
import { PopupMaxSizeCalculator } from "@app/ui";

import { useTranslation } from "libs";

import SettingsPopupContent from "components/SettingsPopupContent";

export interface TableFilterTemplateInterface {
  submitText?: string;
  resetText?: string;
  children: React.ReactNode;
  onSubmit: () => void;
  onReset: () => void;
}

function TableFilterTemplate({ submitText, resetText, children, onSubmit, onReset }: TableFilterTemplateInterface) {
  const t = useTranslation().withKeyPrefix("common.form_fields.template");
  const [ref, setRef] = React.useState<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!ref) return;
    const calculator = new PopupMaxSizeCalculator(ref, 100);
    return calculator.run();
  }, [ref]);

  return (
    <SettingsPopupContent
      ref={setRef}
      actions={
        <>
          <Button size="small" onClick={onReset}>
            {resetText ?? t("reset_button")}
          </Button>
          <Button size="small" type="primary" onClick={onSubmit}>
            {submitText ?? t("submit_button")}
          </Button>
        </>
      }
    >
      {children}
    </SettingsPopupContent>
  );
}

export default React.memo(TableFilterTemplate);
