import React, { SyntheticEvent } from "react";
import { Input } from "antd";
import { eventValue } from "@worksolutions/react-utils";
import { SearchOutlined } from "@ant-design/icons";

import { useTranslation } from "libs";

import { iconStyles } from "./style.css";

interface SearchInputInterface {
  className?: string;
  placeholder: string | undefined;
  value: string;
  onChange: (value: string) => void;
}

function SearchInput({ className, placeholder, value, onChange }: SearchInputInterface) {
  const t = useTranslation().withKeyPrefix("common.form_fields.checkboxes");
  const handleChange = React.useCallback((e: SyntheticEvent) => eventValue(onChange)(e), [onChange]);

  return (
    <div className={className}>
      <Input
        size="small"
        value={value}
        placeholder={placeholder ?? t("search_placeholder")}
        onChange={handleChange}
        allowClear
        prefix={<SearchOutlined className={iconStyles} />}
      />
    </div>
  );
}

export default React.memo(SearchInput);
