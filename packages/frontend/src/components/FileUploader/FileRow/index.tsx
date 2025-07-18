import React from "react";
import { observer } from "mobx-react-lite";
import { PaperClipOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Progress, Spin, Typography } from "antd";
import cn from "classnames";
import { useAsyncFn, useBoolean } from "@worksolutions/react-utils";
import { Tooltip } from "@app/ui";

import {
  deleteButtonStyles,
  fileIconStyles,
  fileNameStatusStyleVariants,
  fileNameStyles,
  progressStyles,
  wrapperStyles,
} from "./style.css";

export interface FileUploaderUploadedFileInterface {
  status: "uploaded";
  id: string;
  name: string;
}

export interface FileUploaderUploadingFileInterface {
  status: "uploading";
  id: string;
  name: string;
  progress: number;
}

export interface FileUploaderErrorFileInterface {
  status: "error";
  id: string;
  name: string;
  cause?: string;
}

interface FileRowInterface {
  file: FileUploaderUploadedFileInterface | FileUploaderUploadingFileInterface | FileUploaderErrorFileInterface;
  onDelete: (id: string) => Promise<any>;
  onClick?: (id: string) => any;
}

function FileRow({ file, onDelete, onClick }: FileRowInterface) {
  const [{ loading: deleting }, asyncOnDelete] = useAsyncFn(onDelete, [onDelete]);
  const handleDelete = React.useCallback(
    (e: React.SyntheticEvent<any>) => {
      e.stopPropagation();
      void asyncOnDelete(file.id);
    },
    [asyncOnDelete, file.id],
  );

  const [clickLoading, enableClickLoading, disableClickLoading] = useBoolean(false);

  const handleClick = React.useCallback(() => {
    const result = onClick?.(file.id);
    if (!(result instanceof Promise)) return;
    enableClickLoading();
    result.finally(disableClickLoading);
  }, [disableClickLoading, enableClickLoading, file.id, onClick]);

  const loading = deleting || clickLoading;

  return (
    <div className={wrapperStyles} onClick={handleClick}>
      <PaperClipOutlined className={fileIconStyles} />
      <Tooltip text={file.status === "error" && file.cause ? file.cause : file.name}>
        <Typography.Text className={cn(fileNameStyles, fileNameStatusStyleVariants[file.status])}>
          {file.name}
        </Typography.Text>
      </Tooltip>
      {file.status === "uploading" && file.progress !== 0 && (
        <Progress className={progressStyles} percent={Math.ceil(file.progress * 100)} />
      )}
      <Button className={deleteButtonStyles} disabled={loading} size="small" onClick={handleDelete}>
        {loading ? <Spin size="small" /> : <DeleteOutlined />}
      </Button>
    </div>
  );
}

export default observer(FileRow);
