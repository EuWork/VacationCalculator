import React from "react";
import { observer } from "mobx-react-lite";
import { InboxOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { useFileSelector } from "@worksolutions/react-utils";
import { FileInterface } from "@worksolutions/utils";
import cn from "classnames";

import {
  iconStyles,
  requiredTextStyles,
  textStyles,
  wrapperErrorStyles,
  wrapperSizeStyleVariants,
  wrapperStyles,
} from "./style.css";

export interface DragDropAreaInterface {
  error: boolean | undefined;
  required: boolean | undefined;
  text: string;
  multiple: boolean;
  acceptTypes?: string;
  size?: keyof typeof wrapperSizeStyleVariants;
  onUpload: (file: FileInterface) => void;
}

function DragDropArea({
  error,
  required,
  text,
  size = "default",
  multiple,
  acceptTypes,
  onUpload,
}: DragDropAreaInterface) {
  const [validationError, setValidationError] = React.useState<string | null>(null);

  const validateAndUpload = React.useCallback(
    (file: FileInterface) => {
      const allowedExtensions = [".xls", ".xlsx"];
      const isValid = allowedExtensions.some((ext) => file.name.toLowerCase().endsWith(ext));

      if (!isValid) {
        alert("Пожалуйста, загружайте только файлы Excel (.xls, .xlsx)");
        return;
      }

      setValidationError(null);
      onUpload(file);
    },
    [onUpload],
  );

  const handleUploadFilesMultiply = React.useCallback(
    (files: FileInterface[]) => files.forEach(validateAndUpload),
    [validateAndUpload],
  );
  const handleUploadFilesSingle = React.useCallback(
    (file: FileInterface) => validateAndUpload(file),
    [validateAndUpload],
  );

  const { dropAreaProps: dropAreaPropsMultiply, openNativeFileDialog: openNativeFileDialogMultiply } = useFileSelector(
    handleUploadFilesMultiply,
    { multiply: true, acceptTypes },
  );

  const { dropAreaProps: dropAreaPropsSingle, openNativeFileDialog: openNativeFileDialogSingle } = useFileSelector(
    handleUploadFilesSingle,
    { multiply: false, acceptTypes },
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        {...(multiple ? dropAreaPropsMultiply : dropAreaPropsSingle)}
        className={cn(wrapperStyles, error && wrapperErrorStyles, wrapperSizeStyleVariants[size])}
        onClick={multiple ? openNativeFileDialogMultiply : openNativeFileDialogSingle}
      >
        <InboxOutlined className={iconStyles} />
        <Typography.Text className={textStyles} type="secondary">
          {required && (
            <Typography.Text className={requiredTextStyles} type="danger">
              *
            </Typography.Text>
          )}
          {text}
        </Typography.Text>
      </div>
      {validationError && (
        <Typography.Text type="danger" style={{ marginTop: 8 }}>
          {validationError}
        </Typography.Text>
      )}
    </div>
  );
}

export default observer(DragDropArea);
