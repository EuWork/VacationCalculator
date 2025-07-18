import React from "react";
import { ToastContainer } from "react-toastify";

export enum NotifyToastifyContainerId {
  default = "default",
  newOnTopLimit3 = "new_on_top__limit_3",
}

function NotifyToastifyContainers() {
  return (
    <>
      <ToastContainer newestOnTop containerId={NotifyToastifyContainerId.newOnTopLimit3} />
      <ToastContainer containerId={NotifyToastifyContainerId.default} />
    </>
  );
}

export default React.memo(NotifyToastifyContainers);
