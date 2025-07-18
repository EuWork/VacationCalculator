import React from "react";

import { NotifyToastifyContainerId } from "./notify-toastify";

export interface ToastInfo {
  content: React.ReactNode;
  options?: {
    placement?: "topRight" | "topCenter";
    autoClose?: number;
    __toastifyOptions?: {
      containerId?: NotifyToastifyContainerId;
    };
  };
}

export * from "./notify-ant";
export * from "./notify-toastify";
