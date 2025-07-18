import React from "react";
import { Modal as UIModal } from "antd";

export interface ModalInterface {
  className?: string;
  opened: boolean;
  onClose: () => void;
  title?: string;
  width?: number;
  children: React.ReactNode;
  closeOnClickOutside?: boolean;
  _modalRender?: (node: React.ReactNode) => React.ReactNode;
}

function Modal({
  className,
  opened,
  onClose,
  title,
  width,
  children,
  closeOnClickOutside = true,
  _modalRender,
}: ModalInterface) {
  const handleCancel = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if ((e.target as HTMLElement).classList.contains("ant-modal-wrap")) {
        if (!closeOnClickOutside) return;
      }
      onClose();
    },
    [closeOnClickOutside, onClose],
  );

  return (
    <UIModal
      className={className}
      open={opened}
      modalRender={_modalRender}
      title={title}
      width={width}
      footer={null}
      destroyOnClose
      onCancel={handleCancel}
    >
      {children}
    </UIModal>
  );
}

export default React.memo(Modal);
