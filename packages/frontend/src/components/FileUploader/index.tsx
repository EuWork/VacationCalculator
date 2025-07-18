import React from "react";
import { observer } from "mobx-react-lite";
import cn from "classnames";
import { FileInterface } from "@worksolutions/utils";

import FileRow, {
  FileUploaderErrorFileInterface,
  FileUploaderUploadedFileInterface,
  FileUploaderUploadingFileInterface,
} from "./FileRow";
import DragDropArea, { DragDropAreaInterface } from "./DragDropArea";

import { filesWrapperStyles, wrapperStyles } from "./style.css";

export type FileUploaderFile =
  | FileUploaderUploadedFileInterface
  | FileUploaderUploadingFileInterface
  | FileUploaderErrorFileInterface;

export interface FileUploaderInterface {
  className?: string;
  required?: boolean;
  error?: boolean;
  files: FileUploaderFile[];
  multiple: boolean;
  acceptTypes?: string;
  dragDropAreaText: string;
  size?: DragDropAreaInterface["size"];
  onDeleteFile: (id: string) => Promise<any>;
  onUploadFile: (file: FileInterface) => Promise<void>;
  onFileClick?: (id: string) => any;
}

function FileUploader({
  className,
  required,
  error,
  files,
  multiple,
  acceptTypes,
  size,
  dragDropAreaText,
  onDeleteFile,
  onUploadFile,
  onFileClick,
}: FileUploaderInterface) {
  return (
    <div className={cn(wrapperStyles, "file-uploader", className)}>
      {files.length !== 0 && (
        <div className={filesWrapperStyles}>
          {files.map((file) => (
            <FileRow key={file.id} file={file} onDelete={onDeleteFile} onClick={onFileClick} />
          ))}
        </div>
      )}
      {multiple ? (
        <DragDropArea
          error={error}
          required={required}
          acceptTypes={acceptTypes}
          size={size}
          multiple
          text={dragDropAreaText}
          onUpload={onUploadFile}
        />
      ) : (
        files.length === 0 && (
          <DragDropArea
            error={error}
            required={required}
            acceptTypes={acceptTypes}
            size={size}
            multiple={false}
            text={dragDropAreaText}
            onUpload={onUploadFile}
          />
        )
      )}
    </div>
  );
}

export default observer(FileUploader);

export type {
  FileUploaderUploadedFileInterface,
  FileUploaderUploadingFileInterface,
  FileUploaderErrorFileInterface,
} from "./FileRow";
